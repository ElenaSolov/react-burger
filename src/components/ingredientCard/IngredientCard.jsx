import React, { useState } from "react";
//import {useSelector} from "react-redux";
import ingredientCardStyles from "./ingredientCard.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modals/modal/Modal";
import IngredientDetails from "../ingredientDetails/IngredientDetails";
import propTypesConfig from "../../utils/propTypesConfig";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const IngredientCard = ({ ingredient, onClick }) => {
  const [open, setOpen] = useState(false);
  const ingredientDetailsHeader = "Детали ингредиента";
  const [{isDrag}, dragRef] = useDrag({
  type: 'ingredient',
  item: ingredient,
  collect: monitor => ({
              isDrag: monitor.isDragging()
          })
  });
console.log(ingredient._id)
  return (
    !isDrag &&<li ref={dragRef} onClick={() => {onClick(); !open && setOpen(true)}}>
      <article className={`${ingredientCardStyles.card} mt-6 ml-4 mr-4 mb-10`}>
        <Counter />
        <img
          className={`${ingredientCardStyles.img} ml-4 mr-4`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <p
          className={`${ingredientCardStyles.price} mt-4 text text_type_digits-default`}
        >
          {ingredient.price}
          <span className={ingredientCardStyles.priceIcon}>
            <CurrencyIcon />
          </span>
        </p>
        <p className="mt-4 text text_type_main-default">{ingredient.name}</p>
      </article>

      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          header={ingredientDetailsHeader}
        >
          <IngredientDetails />
        </Modal>
      )}
    </li>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.shape(propTypesConfig).isRequired,
};

export default IngredientCard;
