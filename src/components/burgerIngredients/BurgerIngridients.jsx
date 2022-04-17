import React, { useEffect } from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import IngredientsList from "../ingredientsList/IngredientsList";
import { addScroll } from "../../utils/utils";
import IngredientTabs from "../ingredientTabs/IngredientTabs";

const BurgerIngredients = () => {
  useEffect(() => {
    addScroll();
  }, []);

  return (
    <section className={burgerIngredientsStyles.ingredients}>
      <h1
        className={`${burgerIngredientsStyles.header} text text_type_main-large mt-10`}
      >
        Соберите бургер
      </h1>
      <IngredientTabs />
      <IngredientsList />
    </section>
  );
};

export default BurgerIngredients;
