import React from 'react';
import appStyles from './App.module.css';
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngridients";
import * as icons from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredients} from './../../utils/data';

function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader icons = {icons}/>
        <BurgerIngredients icons = {icons} ingredients={ingredients}/>
    </div>
  );
}

export default App;
