import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { httpMethods } from "../../utils/constants/global";

export default function Logout() {
  const { userAuth, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    // todo use requestre
    // todo add abort controller for all useEffects
    // todo add default path
    // todo fix dep array
    fetch("http://localhost:3030/auth/logout", {
      method: httpMethods.GET,
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${user.authToken}`,
      },
      signal: abortController.signal,
    })
      .then(() => {
        userAuth();
        navigate("/");
      })
      .catch((err) => console.error(err));

    return () => {
      abortController.abort();
    };
  }, []);
}
