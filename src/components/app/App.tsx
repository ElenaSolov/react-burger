import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../burgerIngredients/BurgerIngredients";

function App() {
  return (
      <div className={appStyles.app}>
        <AppHeader />
        <BurgerIngredients />
      </div>
  );
}

export default App;
