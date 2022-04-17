import React, { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../burgerIngredients/BurgerIngridients";
import BurgerConstructor from "../burgerConstructor/BurgerConstructor";
import { getIngredients } from "../../utils/api.js";
import { IngredientsContext } from "../../services/appContext.js";

function App() {
  const [state, setState] = useState({
    ingredients: [],
    loading: true,
    success: false,
  });

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setState({
          ingredients: data.data,
          loading: false,
          success: data.success,
        });
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        console.log(err);
      });
  }, []);

  return state.loading ? (
    <h1>Loading</h1>
  ) : state.success ? (
    <div className={appStyles.app}>
      <IngredientsContext.Provider value={state}>
        <AppHeader />
        <main className={appStyles.main} id="modals">
          <div className={appStyles.container}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      </IngredientsContext.Provider>
    </div>
  ) : (
    <h1>Error</h1>
  );
}

export default App;
