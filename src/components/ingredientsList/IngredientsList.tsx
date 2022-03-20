import React from "react";

class IngredientsList extends React.Component {
    constructor() {
        super();
        this.buns = ingredients.filter(ingredient => ingredient['type'] === 'bun');
        this.mains = ingredients.filter(ingredient => ingredient['type'] === 'main');
        this.sauces = ingredients.filter(ingredient => ingredient['type'] === 'sauce');
    }
    render () {
        (
            <section className={`${ingredientsListStyles.ingredientsSection} vScroll`}>
                <h2 id='buns' className={`${ingredientsListStyles.header} mt-10`}>Булки</h2>
                <ul className={ingredientsListStyles.list}>
                    {buns.map(ingredient => {
                        return <IngredientCard key={ingredient._id} name={ingredient.name} price={ingredient.price} img={ingredient.image}></IngredientCard>
                    })}
                </ul>
                <h2 id='sauces' className={`${ingredientsListStyles.header} mt-10`}>Соусы</h2>
                <ul className={ingredientsListStyles.list}>
                    {sauces.map(ingredient => {
                        return <IngredientCard key={ingredient._id} name={ingredient.name} price={ingredient.price} img={ingredient.image}></IngredientCard>
                    })}
                </ul>
                <h2 id='mains' className={`${ingredientsListStyles.header} mt-10`}>Начинки</h2>
                <ul className={ingredientsListStyles.list}>
                    {mains.map(ingredient => {
                        return <IngredientCard key={ingredient._id} name={ingredient.name} price={ingredient.price} img={ingredient.image}></IngredientCard>
                    })}
                </ul>
            </section>
        )
    }
}
export  default IngredientsList;