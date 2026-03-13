import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const auth: any = useContext(AuthContext);

  if (auth.loading) {
    return <p>Loading...</p>;
  }

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;