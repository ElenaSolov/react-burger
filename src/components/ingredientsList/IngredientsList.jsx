import React from 'react';
import IngredientCard from "../ingredientCard/IngredientCard";
import ingredientsListStyles from "./ingredientsList.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import propTypesConfig from "../../utils/propTypesConfig";
import PropTypes from "prop-types";

const IngredientsList = ({ingredients}) => {
  
  return (
    <section className={`${ingredientsListStyles.ingredientsSection} ingredientsScroll`}>
      <h2 id='buns' className={`${ingredientsListStyles.header} mt-10`}>Булки</h2>
      <ul className={ingredientsListStyles.list}>
      {ingredients
        .filter(ingredient => ingredient['type'] === 'bun')
        .map(ingredient => {
          return <IngredientCard key={ingredient._id} ingredient={ingredient} />
      })}
      </ul>
      <h2 id='sauces' className={`${ingredientsListStyles.header} mt-10`}>Соусы</h2>
      <ul className={ingredientsListStyles.list}>
        {ingredients
          .filter(ingredient => ingredient['type'] === 'sauce')
          .map(ingredient => {
          return <IngredientCard key={ingredient._id} ingredient={ingredient} CurrencyIcon={CurrencyIcon} />
        })}
      </ul>
      <h2 id='mains' className={`${ingredientsListStyles.header} mt-10`}>Начинки</h2>
      <ul className={ingredientsListStyles.list}>
        {ingredients
          .filter(ingredient => ingredient['type'] === 'main')
          .map(ingredient => {
          return <IngredientCard key={ingredient._id} ingredient={ingredient} />
        })}
      </ul>
    </section>
  );
};
IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(propTypesConfig))
};
export default IngredientsList;