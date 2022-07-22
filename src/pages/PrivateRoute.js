import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
import { useUserContext } from "../context/user_context";
import { Loading } from "../components";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
export default PrivateRoute;
