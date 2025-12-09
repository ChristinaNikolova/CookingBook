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
  const [error, setError] = useState("");
  const config = useConfigToken();

  useEffect(() => {
    console.log("in useeffect");

    let isActive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const abortController = new AbortController();

    requester(url, method, data, config, abortController.signal)
      .then((res) => {
        if (!isActive) {
          return;
        }
        setValues(res);
        // todo setError here or before requester
        setError("");
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
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

  return { values, loading, error };
}
