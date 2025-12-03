import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export default function AdminRoute() {
  const { isAdmin } = useAuthContext();

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
