import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Preloader from "./preloader/PreLoader.jsx";

function ProtectedRoute({
  children,
  redirectPath = "/login",
  type = "private",
}) {
  console.log(typeof redirectPath);
  let auth = useSelector((store) => store.auth);
  const location = useLocation();
  const isAuthChecked = useSelector((store) => store.auth.isAuthChecked);
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!auth.isAuth && type === "private") {
    return <Navigate to={redirectPath} replace state={location.pathname} />;
  } else if (auth.isAuth && type === "public") {
    return <Navigate to={redirectPath} replace state={location.state} />;
  }

  return children;
}
ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.element.isRequired,
};
export default ProtectedRoute;
