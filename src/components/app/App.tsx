import React from 'react';
import appStyles from './App.module.css';
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngridients";


function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
        <BurgerIngredients />
    </div>
  );
}

export default App;
