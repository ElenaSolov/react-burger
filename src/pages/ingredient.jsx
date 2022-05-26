import React from "react";
import pagesStyles from "./pages.module.css";
import IngredientDetails from "./../components/ingredientDetails/IngredientDetails";

const IngredientPage = () => {
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
