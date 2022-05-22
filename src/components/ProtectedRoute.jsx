import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, redirectPath = "/login" }) {
  let auth = useSelector((store) => store.auth);
  const location = useLocation();

  if (!auth.isAuth) {
    return <Navigate to={redirectPath} replace state={location.pathname} />;
  }

  return children;
}

export default ProtectedRoute;
