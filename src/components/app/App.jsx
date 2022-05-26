import React, { useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/AppHeader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import img from "../../images/burger_icon.svg";
import { getIngredients } from "../../services/actions/actions.js";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import RestorePasswordPage from "../../pages/restorePassword";
import ResetPasswordPage from "../../pages/reset";
import Profile from "../../pages/profile";
import IngredientPage from "../../pages/ingredient";
import ProtectedRoute from "../ProtectedRoute";
import { getUser } from "../../services/actions/authActions";
import { HomePage } from "../../pages/home";
import NotFoundPage from "../../pages/notFoundPage";
import Modal from "../modals/modal/Modal";
import IngredientDetails from "../ingredientDetails/IngredientDetails";

function App() {
  const dispatch = useDispatch();
  const isLoaded = useSelector(
    (store) => store.ingredients.ingredientsRequestStatus
  );
  window.history.replaceState({}, document.title);
  const location = useLocation();
  console.log(location);
  const background = location.state?.background;
  console.log(background);
  const navigate = useNavigate();
  const onModalClose = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return !isLoaded ? (
    <div className={appStyles.imgContainer}>
      <img className={appStyles.img} src={img} alt="Иконка бургера" />
    </div>
  ) : (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Routes location={background || location}>
          <Route path="/" exact element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<RestorePasswordPage />} />
          <Route path="forgot-password/reset" element={<ResetPasswordPage />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="profile"
            exact
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        {background && (
          <Routes>
            {/* Попап с модальным окном */}
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={onModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </DndProvider>
    </>
  );
}

export default App;
