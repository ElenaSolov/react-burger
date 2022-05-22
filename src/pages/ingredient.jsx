import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { useSelector, useDispatch } from "react-redux";
import IngredientDetails from "./../components/ingredientDetails/IngredientDetails";
import { useLocation } from "react-router-dom";
import { setCurrentIngredient } from "../services/actions/actions";

const IngredientPage = () => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location);
  const id = location.pathname.split("/")[2];
  const ingredient = ingredients.find((ing) => ing._id === id);
  console.log(ingredient);

  dispatch(setCurrentIngredient(ingredient));
  console.log(id);
  const currentIngredient = useSelector(
    (store) => store.ingredients.currentIngredient
  );
  console.log(currentIngredient);

  return (
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
