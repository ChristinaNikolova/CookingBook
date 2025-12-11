import { useState, useRef, useCallback, useEffect } from "react";
import useConfigToken from "./useConfigToken";
import requester from "../utils/helpers/requester";
import { httpMethods } from "../utils/constants/global";

export default function useAction() {
  const [values, setValues] = useState(null);
  const [serverError, setServerError] = useState("");

  const config = useConfigToken();
  const abortRef = useRef(null);
  const isActiveRef = useRef(true);

  const execute = useCallback(
    async (url, method = httpMethods.GET, data = null) => {
      setValues(null);
      setServerError("");

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

        if (isActiveRef.current) {
          setValues(result);
        }

        return result;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setServerError(err.message);
        }
        throw err;
      }
    },
    [config]
  );

  useEffect(() => {
    isActiveRef.current = true;

    return () => {
      isActiveRef.current = false;
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return { execute, values, serverError };
}
