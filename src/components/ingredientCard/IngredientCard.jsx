import React from 'react';
import ingredientCardStyles from './ingredientCard.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientCard extends React.Component {
    constructor({name, price, img}, ...rest) {
        super();
        this.state = {name, price, img};
    }

    render () {
        return (
            <li>
            <article className={`${ingredientCardStyles.card} mt-6 ml-4 mr-4 mb-10`}>
                <Counter count={1} size="default" />
                <img className={`${ingredientCardStyles.img} ml-4 mr-4`} src={this.state.img} alt={this.state.name}/>
                <p className={`${ingredientCardStyles.price} mt-4 text text_type_digits-default`}>{this.state.price}<span
                    className={ingredientCardStyles.priceIcon}><CurrencyIcon type='primary'/></span></p>
                <p className='mt-4 text text_type_main-default'>{this.state.name}</p>
            </article>
        </li>
    )
    }
}
 export default IngredientCard;