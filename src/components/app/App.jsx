import React, { useEffect }from "react";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../burgerIngredients/BurgerIngridients";
import BurgerConstructor from "../burgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import img from "../../images/burger_icon.svg";
import { getIngredients } from '../../services/actions/actions.js';

function App() {

  const dispatch = useDispatch();
  const isLoaded = useSelector(store => store.ingredients.ingredientsRequestStatus);

  useEffect(()=>{
    dispatch(getIngredients());
  }, [dispatch]);

 return (
    !isLoaded
    ? <div className={appStyles.imgContainer}>
        <img className={appStyles.img} src={img} alt="Иконка бургера" />
      </div>
    : <div className={appStyles.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={appStyles.main}>
            <div className={appStyles.container}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
        </DndProvider>
    </div>
  )
}

export default App;
