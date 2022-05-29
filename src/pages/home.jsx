import React from "react";
import BurgerIngredients from "../components/burgerIngredients/BurgerIngridients";
import BurgerConstructor from "../components/burgerConstructor/BurgerConstructor";
import appStyles from "../components/app/app.module.css";

export function HomePage() {
  return (
    <main className={appStyles.main}>
      <div className={appStyles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
}
