import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

export default function ProtectedRoute() {
  const token = useAppSelector((state) => state.token.token);

  if (token) {
    return <Outlet></Outlet>;
  }
  return <Navigate to={"/login"}></Navigate>;
}
