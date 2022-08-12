import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = () => {
  return (
    <>
      {localStorage.getItem("token") ? <Outlet /> : <Navigate to="/admin/login" />}
    </>
  );
};

export default ProtectedRouteAdmin;
