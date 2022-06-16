import React from "react";
import ingredientDetailsStyles from "./ingredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const { id } = useParams();

  const ingredient = ingredients.find((ing) => ing._id === id);

  return (
    <>
      <img
        src={ingredient.image}
        className={ingredientDetailsStyles.img}
        alt={ingredient.name}
      />
      <p
        className={`${ingredientDetailsStyles.title} text text_type_main-medium mt-4 mb-8`}
      >
        {ingredient.name}
      </p>
      <ul className={`${ingredientDetailsStyles.list} mb-15`}>
        <li className={`${ingredientDetailsStyles.listItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.listItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.listItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.listItem}`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
