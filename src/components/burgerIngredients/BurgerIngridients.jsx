import React, { useEffect } from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import IngredientsList from "../ingredientsList/IngredientsList";
import { addScroll } from "../../utils/utils";
import IngredientTabs from "../ingredientTabs/IngredientTabs";
// import propTypesConfig from "../../utils/propTypesConfig";
// import PropTypes from "prop-types";
import { IngredientsContext } from "../../services/appContext.js";

const BurgerIngredients = () => {
  const { ingredients } = React.useContext(IngredientsContext);
  console.log(ingredients);
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

// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.arrayOf(PropTypes.shape(propTypesConfig).isRequired)
//     .isRequired,
// };

export default BurgerIngredients;
