import React, {useEffect} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTabsStyles from './ingredientTabs.module.css';
import {setTabsListeners} from "../../utils/utils";
import {useSelector, useDispatch} from "react-redux";
import {SET_CURRENT_TAB} from "../../services/actions/actions.js";

const IngredientTabs = () => {
  const dispatch = useDispatch();
  const current = useSelector(store => store.ingredients.currentTab);
  const setCurrent = () => {
  dispatch({type:SET_CURRENT_TAB, current})
  }

    useEffect(()=> {
        setTabsListeners()
    }, []);
    
    return (
        <ul className={`${ingredientTabsStyles.tabs} mt-5 tabs`}>
            <li>
                <a href='#buns' className={`${ingredientTabsStyles.tabLink} tabLink`}>
                    <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab>
                </a>
            </li>
            <li>
                <a href='#sauces' className={`${ingredientTabsStyles.tabLink} tabLink`}>
                    <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
                </a>
            </li>
            <li>
                <a href='#mains' className={`${ingredientTabsStyles.tabLink} tabLink`}>
                    <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
                </a>
            </li>
        </ul>
    );
};

export default IngredientTabs;