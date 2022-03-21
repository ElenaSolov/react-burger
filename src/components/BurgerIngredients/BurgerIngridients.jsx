import React, {useEffect} from 'react';

import burgerIngredientsStyles from './BurgerIngredients.module.css'
import IngredientsList from "../IngredientsList/IngredientsList";
import {addScroll} from './../../utils/utils';
import IngredientTabs from "../ingredientTabs/IngredientTabs";
import BurgerConstructor from "../burgerConstructor/BurgerConstructor";

const BurgerIngredients = ({icons, ingredients}) => {
  useEffect(()=> {
    addScroll()
  }, []);
  
  return (
    <main className={burgerIngredientsStyles.main}>
      
      <div className={burgerIngredientsStyles.container}>
        <section className={burgerIngredientsStyles.ingredients}>
          <h1 className={`${burgerIngredientsStyles.header} text text_type_main-large mt-10`}>Соберите бургер</h1>
          <IngredientTabs />
          <IngredientsList icons={icons} ingredients={ingredients} />
        </section>
        <BurgerConstructor icons={icons}/>
        
      </div>
    </main>
  );
};

export default BurgerIngredients;