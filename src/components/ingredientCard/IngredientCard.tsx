import React from 'react';
import ingredientCardStyles from './ingredientCard.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientCard extends React.Component {
    constructor({name, price, img}) {
        super();
        this.state = {name, price, img}
    }

    render () {
        (<li>
            <article className={`${ingredientCardStyles.card} mt-6 ml-4 mr-4 mb-10`}>
                <Counter count={1} size="default" />
                <img className={`${ingredientCardStyles.img} ml-4 mr-4`} src={img} alt={name}/>
                <p className={`${ingredientCardStyles.price} mt-4 text text_type_digits-default`}>{price}<span
                    className={ingredientCardStyles.priceIcon}><CurrencyIcon type='primary'/></span></p>
                <p className='mt-4 text text_type_main-default'>{name}</p>
            </article>
        </li>
    )
    }
}

export default IngredientCard;