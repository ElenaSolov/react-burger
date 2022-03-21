import React, {useEffect} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTabsStyles from './ingredientTabs.module.css';
import {addScroll, setTabsListeners} from "../../utils/utils";

const IngredientTabs = () => {
    const [current, setCurrent] = React.useState('Булки');
    console.log(22, current)
    useEffect(()=> {
        setTabsListeners()
    }, []);
    
    return (
        <ul className={`${ingredientTabsStyles.tabs} mt-5`}>
            <li>
                <a href='#buns' className={`${ingredientTabsStyles.tabLink}`}>
                    <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab>
                </a>
            </li>
            <li>
                <a href='#sauces' className={`${ingredientTabsStyles.tabLink}`}>
                    <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
                </a>
            </li>
            <li>
                <a href='#mains' className={`${ingredientTabsStyles.tabLink}`}>
                    <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
                </a>
            </li>
        </ul>
    );
};

export default IngredientTabs;