import React, {useState} from 'react';
import ingredientCardStyles from './ingredientCard.module.css';
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from '../modals/modal/Modal';
import IngredientDetails from '../ingredientDetails/IngredientDetails';

const IngredientCard = ({data, CurrencyIcon}) => {
  const [open, setOpen] = useState(false);
  const ingredientDetailsHeader = 'Детали ингредиента';

  return (
    <li onClick={() => setOpen(true)}>
    <article className={`${ingredientCardStyles.card} mt-6 ml-4 mr-4 mb-10`}>
      <Counter />
      <img className={`${ingredientCardStyles.img} ml-4 mr-4`} src={data.image} alt={data.name} />
      <p className={`${ingredientCardStyles.price} mt-4 text text_type_digits-default`}>
        {data.price}
        <span className={ingredientCardStyles.priceIcon}>
         <CurrencyIcon />
        </span>
      </p>
      <p className='mt-4 text text_type_main-default'>{data.name}</p>
    </article>

    {open&&<Modal isOpen={open} onClose={() => setOpen(false)} header={ingredientDetailsHeader}>
            <IngredientDetails data={data} />
          </Modal>}
    </li>
  );
};

IngredientCard.propTypes = {
  data: PropTypes.exact({
      calories: PropTypes.number,
      carbohydrates: PropTypes.number,
      fat: PropTypes.number,
      image: PropTypes.string,
      image_large: PropTypes.string,
      image_mobile: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      proteins: PropTypes.number,
      type: PropTypes.string,
      __v: PropTypes.number,
      _id: PropTypes.string
    }),
  CurrencyIcon: PropTypes.func,
}

export default IngredientCard;