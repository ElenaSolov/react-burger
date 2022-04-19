import React, {useEffect} from "react";
import IngredientCard from "../ingredientCard/IngredientCard";
import ingredientsListStyles from "./ingredientsList.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import {getIngredients, SET_CURRENT_INGREDIENT, SET_CURRENT_TAB} from '../../services/actions/actions.js';
import { getCurrentTab } from '../../utils/utils.js';


const IngredientsList = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getIngredients());
        getCurrentTab();
    }, [dispatch]);
  const  ingredients = useSelector(store => store.ingredients);
  const setCurrentIngredient = (ingredient) => {
  dispatch({type: SET_CURRENT_INGREDIENT, ingredient})}
    const setCurrentTab = () => {
    const currentTab = getCurrentTab();
    dispatch({type: SET_CURRENT_TAB, currentTab});
    }
  return (
    <section onScroll={setCurrentTab}
      className={`${ingredientsListStyles.ingredientsSection} ingredientsScroll`}
    >
      <h2 id="buns" className={`${ingredientsListStyles.header} mt-10 header tab`}>
        Булки
      </h2>
      <ul className={`${ingredientsListStyles.list} ingredients__list`} id='Булки'>
        {ingredients
          .filter((ingredient) => ingredient["type"] === "bun")
          .map((ingredient) => {
            return (
              <IngredientCard
                onClick={()=> setCurrentIngredient(ingredient)}
                key={ingredient._id}
                ingredient={ingredient} />
            );
          })}
      </ul>
      <h2 id="sauces" className={`${ingredientsListStyles.header} mt-10 tab`}>
        Соусы
      </h2>
      <ul className={`${ingredientsListStyles.list} ingredients__list`} id='Соусы'>
        {ingredients
          .filter((ingredient) => ingredient["type"] === "sauce")
          .map((ingredient) => {
            return (
              <IngredientCard
                onClick={()=> setCurrentIngredient(ingredient)}
                key={ingredient._id}
                ingredient={ingredient}
                CurrencyIcon={CurrencyIcon}
              />
            );
          })}
      </ul>
      <h2 id="mains" className={`${ingredientsListStyles.header} mt-10 tab`}>
        Начинки
      </h2>
      <ul className={`${ingredientsListStyles.list} ingredients__list`} id='Начинки'>
        {ingredients
          .filter((ingredient) => ingredient["type"] === "main")
          .map((ingredient) => {
            return (
              <IngredientCard
                onClick={()=> setCurrentIngredient(ingredient)}
                key={ingredient._id}
                ingredient={ingredient} />
            );
          })}
      </ul>
    </section>
  );
};

export default IngredientsList;
