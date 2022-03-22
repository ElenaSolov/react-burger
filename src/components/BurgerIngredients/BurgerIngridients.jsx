import React, {useEffect} from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import IngredientsList from "../IngredientsList/IngredientsList";
import {addScroll} from './../../utils/utils';
import IngredientTabs from "../ingredientTabs/IngredientTabs";
import BurgerConstructor from "../burgerConstructor/BurgerConstructor";
import PropTypes from 'prop-types';

const BurgerIngredients = ({icons, ingredients}) => {
  useEffect(()=> {
    addScroll()
    const body = document.querySelector('body');
  }, []);
  
  return (
    <main className={burgerIngredientsStyles.main}>
      
      <div className={burgerIngredientsStyles.container}>
        <section className={burgerIngredientsStyles.ingredients}>
          <h1 className={`${burgerIngredientsStyles.header} text text_type_main-large mt-10`}>Соберите бургер</h1>
          <IngredientTabs />
          <IngredientsList icons={icons} ingredients={ingredients} />
        </section>
        <BurgerConstructor icons={icons} ingredients={ingredients}/>
        
      </div>
    </main>
  );
};

BurgerIngredients.propTypes = {
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
    _id: PropTypes.string
  }))
}
export default BurgerIngredients;