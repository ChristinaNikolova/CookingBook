import { useState, useRef, useCallback, useEffect } from "react";
import useConfigToken from "./useConfigToken";
import requester from "../utils/helpers/requester";

export default function useAction() {
  const abortRef = useRef(null);
  const isActiveRef = useRef(true);

  const [values, setValues] = useState(null);
  const [serverError, setServerError] = useState("");

  const config = useConfigToken();

  const execute = useCallback(
    async (url, method, data = null) => {
      setValues(null);
      setServerError({
        message: "",
        time: Date.now(),
      });

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
          if (isActiveRef.current) {
            setServerError({
              message: err.message,
              time: Date.now(),
            });
          }
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
