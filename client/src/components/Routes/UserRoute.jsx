import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export default function UserRoute() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}
