import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";
import requester from "../utils/helpers/requester";

// todo dep array
export default function useFetch(initialValue, url, method, data) {
  const [values, setValues] = useState(initialValue);
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    let config = {};

    if (isAuthenticated) {
      config.authToken = user.authToken;
    }

    requester(url, method, data, config)
      .then((res) => setValues(res))
      .catch((err) => console.error(err));
  }, []);

  return { values };
}
