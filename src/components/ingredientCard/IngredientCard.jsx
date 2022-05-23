import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Link } from "react-router-dom";
import { openIngredientModal } from "../../services/actions/modalActions.js";
import { setCurrentIngredient } from "../../services/actions/actions";

const IngredientCard = ({ ingredient }) => {
  const open = useSelector((store) => store.modal.openIngredientModal);
  const ingredientDetailsHeader = "Детали ингредиента";
  const id = ingredient._id;
  const dispatch = useDispatch();

  const onClick = () => {
    !open && dispatch(openIngredientModal());
    dispatch(setCurrentIngredient(ingredient));
  };

  let count = useSelector(
    (store) =>
      store.order.orderedIngredients.filter((ing) => ing._id === ingredient._id)
        .length
  );

  const mainBun = useSelector((store) => store.order.orderedBun);
  if (ingredient._id === mainBun._id) {
    count = 2;
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient, start: "ingredientCard" },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <li ref={dragRef} onClick={onClick}>
        <Link
          to={`ingredients/${id}`}
          className={`${ingredientCardStyles.card} mt-6 ml-4 mr-4 mb-10 id={id}`}
        >
          <Counter count={count} />
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
        </Link>

        {open && (
          <Modal header={ingredientDetailsHeader}>
            <IngredientDetails />
          </Modal>
        )}
      </li>
    )
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.shape(propTypesConfig).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientCard;
