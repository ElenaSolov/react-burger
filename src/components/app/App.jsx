import React, { useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/AppHeader";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import img from "../../images/burger_icon.svg";
import { getIngredients } from "../../services/actions/actions.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import { HomePage } from "../../pages/home";

function App() {
  const dispatch = useDispatch();
  const isLoaded = useSelector(
    (store) => store.ingredients.ingredientsRequestStatus
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return !isLoaded ? (
    <div className={appStyles.imgContainer}>
      <img className={appStyles.img} src={img} alt="Иконка бургера" />
    </div>
  ) : (
    //
    <Router>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/" exact element={<HomePage />} />
        </Routes>
      </DndProvider>
    </Router>
    //     </div>
  );
}

export default App;
