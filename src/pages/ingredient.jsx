import React from "react";
import pagesStyles from "./pages.module.css";
import { useSelector, useDispatch } from "react-redux";
import IngredientDetails from "./../components/ingredientDetails/IngredientDetails";
import { useLocation } from "react-router-dom";
import { setCurrentIngredient } from "../services/actions/actions";
import { HomePage } from "./home.jsx";

const IngredientPage = () => {
  const modalState = useSelector((store) => store.modal.openIngredientModal);
  console.log(modalState);
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const ingredient = ingredients.find((ing) => ing._id === id);

  dispatch(setCurrentIngredient(ingredient));

  return modalState ? (
    <HomePage />
  ) : (
    <section className={pagesStyles.ingredientMain}>
      <div className={`${pagesStyles.header} mt-10`}>
        <p className={`${pagesStyles.title} text text_type_main-large`}>
          Детали ингредиента
        </p>
      </div>
      <IngredientDetails />
    </section>
  );
};

export default IngredientPage;
