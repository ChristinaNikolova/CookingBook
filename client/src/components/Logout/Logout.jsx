import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export default function Logout() {
  const { userAuth, authToken } = useAuthContext();
  const navigate = useNavigate();

  // todo add AbortController and check the requests again
  useEffect(() => {
    fetch("http://localhost:3030/auth/logout", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${authToken}`,
      },
    })
      .then(() => {
        userAuth();
        navigate("/");
      })
      .catch((err) => console.error(err));
  }, []);
}
