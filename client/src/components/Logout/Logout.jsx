import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export default function Logout() {
  const { userAuth, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    fetch("http://localhost:3030/auth/logout", {
      method: "get",
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
