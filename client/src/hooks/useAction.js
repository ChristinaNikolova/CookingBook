import { useState, useRef, useCallback } from "react";
import useConfigToken from "./useConfigToken";
import requester from "../utils/helpers/requester";
import { httpMethods } from "../utils/constants/global";

export default function useAction() {
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const config = useConfigToken();
  const abortRef = useRef(null);

  const execute = useCallback(
    async (url, method = httpMethods.GET, data = null) => {
      console.log("in useCallbakc");

      setValues(null);
      setLoading(true);
      setError("");

      // todo do this also in useFetch
      if (abortRef.current) {
        abortRef.current.abort();
      }

      const abortController = new AbortController();
      abortRef.current = abortController;

      try {
        const result = requester(
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
          setError(err.message);
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

  return { execute, values, loading, error };
}
