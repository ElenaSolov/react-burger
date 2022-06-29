import React, { useEffect } from "react";
// import appStyles from "./app.module.css";
import AppHeader from "../appHeader/AppHeader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/actions";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import PreLoader from "../preloader/PreLoader.jsx";
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
import FeedPage from "../../pages/feed";
import OrderPage from "../../pages/order";
import MyOrderPage from "../../pages/myOrderPage";
import ProfileOrders from "../../pages/profileOrders";
import OrderFeedDetails from "../orderFeedDetails/OrderFeedDetails";

function App() {
  const dispatch = useDispatch();
  const isLoaded = useSelector(
    (store) => store.ingredients.ingredientsRequestStatus
  );
  window.history.replaceState({}, document.title);
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const onModalClose = () => {
    navigate(location.state.background);
  };
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);
  return !isLoaded ? (
    <PreLoader />
  ) : (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Routes location={background || location}>
          <Route path="/" exact element={<HomePage />} />
          <Route
            path="ingredients/:id"
            redirectPath={location.pathname}
            element={<IngredientPage />}
          />
          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/:id" element={<OrderPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="register"
            exact
            element={
              <ProtectedRoute type="public" redirectPath="/profile">
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            exact
            element={
              <ProtectedRoute
                type="public"
                redirectPath={location.state || "/profile"}
              >
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="forgot-password"
            exact
            element={
              <ProtectedRoute type="public" redirectPath="/profile">
                <RestorePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="forgot-password/reset"
            exact
            element={
              <ProtectedRoute type="public" redirectPath="/profile">
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            exact
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/orders"
            exact
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
              <ProtectedRoute>
                <MyOrderPage />
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
            <Route
              path="/feed/:id"
              element={
                <Modal onClose={onModalClose}>
                  <OrderFeedDetails
                    order={location.state.order}
                    status={location.state.status}
                  />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <Modal onClose={onModalClose}>
                  <OrderFeedDetails
                    order={location.state.order}
                    status={location.state.status}
                  />
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
