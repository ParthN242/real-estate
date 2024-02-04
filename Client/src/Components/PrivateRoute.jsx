import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
const PrivateRoute = () => {
  const { loading, currentUser } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loading />
      ) : currentUser ? (
        <Outlet />
      ) : (
        <Navigate to="signin" />
      )}
    </>
  );
};

export default PrivateRoute;
