import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
