import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export default function GuestRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
