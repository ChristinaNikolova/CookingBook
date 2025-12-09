import { useEffect, useState } from "react";
import useConfigToken from "./useConfigToken";
import requester from "../utils/helpers/requester";
import { httpMethods } from "../utils/constants/global";

// todo dep array
export default function useFetch(
  initialValue,
  url,
  method = httpMethods.GET,
  data = null
) {
  const [values, setValues] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const config = useConfigToken();

  useEffect(() => {
    console.log("in useeffect");

    requester(url, method, data, config)
      .then((res) => {
        setValues(res);
        setServerError("");
      })
      .catch((err) => {
        console.error(err);
        setServerError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, method, data, config]);

  return { values, loading, serverError };
}
