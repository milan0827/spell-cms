import AppLayout from "@/layout/app-layout/AppLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated, credentials, handleGetCredentials, authCheck } =
    useAuthStore();

  useEffect(() => {
    handleGetCredentials();
  }, []);

  if (!authCheck) return <div>Loading...</div>;

  console.log("Auth state:", { isAuthenticated, credentials });

  if (!isAuthenticated || !credentials) return <Navigate to="/login" />;

  return <AppLayout />;
};

export default ProtectedRoutes;
