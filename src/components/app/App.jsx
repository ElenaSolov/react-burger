import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../burgerIngredients/BurgerIngridients";
import BurgerConstructor from "../burgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  return (
    <div className={appStyles.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={appStyles.main}>
            <div className={appStyles.container}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
          <div id='modals' className={appStyles.modals}/>
        </DndProvider>
    </div>
  )
}

export default App;
