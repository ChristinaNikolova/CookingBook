import { useState, useRef, useCallback, useEffect } from "react";
import useConfigToken from "./useConfigToken";
import requester from "../utils/helpers/requester";
import { httpMethods } from "../utils/constants/global";

export default function useAction() {
  const [values, setValues] = useState(null);
  // todo do I need this
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const config = useConfigToken();
  const abortRef = useRef(null);

  const execute = useCallback(
    async (url, method = httpMethods.GET, data = null) => {
      console.log("in useCallbakc");

      setValues(null);
      setLoading(true);
      setServerError("");

      // todo do this also in useFetch
      if (abortRef.current) {
        abortRef.current.abort();
      }

      const abortController = new AbortController();
      abortRef.current = abortController;

      try {
        const result = await requester(
          url,
          method,
          data,
          config,
          abortController.signal
        );
        setValues(result);

        return result;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setServerError(err.message);
        }
        // todo why diffrebt from useFeth
        // todo flad isActive
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  // Cleanup при unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return { execute, values, loading, serverError };
}
