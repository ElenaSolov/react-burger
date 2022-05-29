import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function ProtectedRoute({
  children,
  redirectPath = "/login",
  type = "private",
}) {
  let auth = useSelector((store) => store.auth);
  const location = useLocation();

  if (!auth.isAuth && type === "private") {
    return <Navigate to={redirectPath} replace state={location.pathname} />;
  } else if (auth.isAuth && type === "public") {
    return <Navigate to={redirectPath} replace state={location.pathname} />;
  }

  return children;
}
ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.element.isRequired,
};
export default ProtectedRoute;
