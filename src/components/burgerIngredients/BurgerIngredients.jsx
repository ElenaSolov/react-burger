import React from "react";
import burgerIngredientsStyles from './burgerIngredients.module.css'
import IngredientsList from "../ingredientsList/IngredientsList";
import OrderTotal from "../orderTotal/OrderTotal";
import {addScroll} from './../../utils/utils';
import IngredientTabs from "../ingredientTabs/IngredientTabs";
import ConstructorEl from "../constructorEl/ConstructorEl";


class BurgerIngredients extends React.Component {
    // useEffect(()=> {
    //     addScroll()
    // }, []);

    render () {
        return (
        <main className={burgerIngredientsStyles.main}>

            <div className={burgerIngredientsStyles.container}>
                <section className={burgerIngredientsStyles.ingredients}>
                    <h1 className={`${burgerIngredientsStyles.header} text text_type_main-large mt-10`}>Соберите
                        бургер</h1>
                    <IngredientTabs/>
                    <IngredientsList></IngredientsList>
                </section>
                <section className={`${burgerIngredientsStyles.constructor} pl-4 pr-4 vScroll`}>
                    <div>
                        <ConstructorEl></ConstructorEl>
                    </div>
                    <OrderTotal/>
                </section>
            </div>
        </main>
    )}
}

export default BurgerIngredients;