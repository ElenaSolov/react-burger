import React, {useEffect, useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../burgerIngredients/BurgerIngridients";
import * as icons from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructor from "../burgerConstructor/BurgerConstructor";
import {getIngredients} from "../api";

function App() {
  const [state, setState] = useState({ingredients: [],
    loading: true,
    success: false});
  useEffect(() => {
    getIngredients()
      .then(data => {
        setState({ingredients: data.data, loading: false, success: data.success});
      })
      .catch(err => {
        setState({...state, loading: false})
      console.log(err)
    })
  }, []);

  return (
    state.loading
      ? <h1>Loading</h1>
      :state.success
        ? (<div className={appStyles.app}>
        <AppHeader icons={icons}/>
        <main className={appStyles.main}>
          <div className={appStyles.container}>
            <BurgerIngredients icons={icons} ingredients={state.ingredients}/>
            <BurgerConstructor icons={icons} ingredients={state.ingredients}/>
          </div>
        </main>
      </div>)
        : <h1>Error</h1>
    );
}

export default App;
