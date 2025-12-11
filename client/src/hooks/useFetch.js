import { useEffect, useState } from "react";
import useConfigToken from "./useConfigToken";
import requester from "../utils/helpers/requester";
import { httpMethods } from "../utils/constants/global";

export default function useFetch(
  initialValue,
  url,
  method = httpMethods.GET,
  data = null
) {
  const [values, setValues] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const config = useConfigToken();

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    const abortController = new AbortController();

    requester(url, method, data, config, abortController.signal)
      .then((res) => {
        if (!isActive) {
          return;
        }
        setValues(res);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err.message);
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [url, method, data, config]);

  return { values, loading };
}
