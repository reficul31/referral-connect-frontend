import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  
  if (!auth || !auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
};