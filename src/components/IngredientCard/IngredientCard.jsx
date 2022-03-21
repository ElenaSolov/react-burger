import React from 'react';
import ingredientCardStyles from './IngredientCard.module.css';
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({data, CurrencyIcon}) => {
  
  return (
    <li>
    <article className={`${ingredientCardStyles.card} mt-6 ml-4 mr-4 mb-10`}>
      <Counter />
      <img className={`${ingredientCardStyles.img} ml-4 mr-4`} src={data.image} alt={data.name} />
      <p className={`${ingredientCardStyles.price} mt-4 text text_type_digits-default`}>
        {data.price}
        <span className={ingredientCardStyles.priceIcon}>
         <CurrencyIcon />
        </span>
      </p>
      <p className='mt-4 text text_type_main-default'>{data.name}</p>
    </article>
    </li>
  );
};

export default IngredientCard;