import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../services/hooks";
import Preloader from "./preloader/PreLoader";

interface IProtectedRoot {
  children: JSX.Element;
  redirectPath?: string;
  type?: string;
}
function ProtectedRoute({
  children,
  redirectPath = "/login",
  type = "private",
}: IProtectedRoot): JSX.Element {
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

export default ProtectedRoute;
