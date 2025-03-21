import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Get token from localStorage

  return token ? <Outlet /> : <Navigate to="/login" />; // Redirect if no token
};

export default ProtectedRoute;
