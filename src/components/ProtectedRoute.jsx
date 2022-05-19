import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, redirectPath = "/login" }) {
  let auth = useSelector((store) => store.auth);

  if (!auth.isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
