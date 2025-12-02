import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

// todo test direct return
export default function useAuthContext() {
  //const data = useContext(AuthContext);
  return useContext(AuthContext);
}
