import React from 'react';
import IngredientCard from "../IngredientCard/IngredientCard";
import ingredientsListStyles from "./IngredientsList.module.css";
import PropTypes from "prop-types";

const IngredientsList = ({icons, ingredients}) => {
  
  return (
    <section className={`${ingredientsListStyles.ingredientsSection} ingredientsScroll`}>
      <h2 id='buns' className={`${ingredientsListStyles.header} mt-10`}>Булки</h2>
      <ul className={ingredientsListStyles.list}>
      {ingredients
        .filter(ingredient => ingredient['type'] === 'bun')
        .map(ingredient => {
          return <IngredientCard key={ingredient._id} data={ingredient} CurrencyIcon={icons.CurrencyIcon} />
      })}
      </ul>
      <h2 id='sauces' className={`${ingredientsListStyles.header} mt-10`}>Соусы</h2>
      <ul className={ingredientsListStyles.list}>
        {ingredients
          .filter(ingredient => ingredient['type'] === 'sauce')
          .map(ingredient => {
          return <IngredientCard key={ingredient._id} data={ingredient} CurrencyIcon={icons.CurrencyIcon} />
        })}
      </ul>
      <h2 id='mains' className={`${ingredientsListStyles.header} mt-10`}>Начинки</h2>
      <ul className={ingredientsListStyles.list}>
        {ingredients
          .filter(ingredient => ingredient['type'] === 'main')
          .map(ingredient => {
          return <IngredientCard key={ingredient._id} data={ingredient} CurrencyIcon={icons.CurrencyIcon}/>
        })}
      </ul>
    </section>
  );
};
IngredientsList.propTypes = {
  icons: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
  ingredients: PropTypes.arrayOf(PropTypes.exact({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat:PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
  }))
}
export default IngredientsList;