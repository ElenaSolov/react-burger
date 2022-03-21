import React from 'react';
import IngredientCard from "../IngredientCard/IngredientCard";
import ingredientsListStyles from "./IngredientsList.module.css";

const IngredientsList = ({icons, ingredients}) => {
  
  return (
    <section className={`${ingredientsListStyles.ingredientsSection} vScroll`}>
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

export default IngredientsList;