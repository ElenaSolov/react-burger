import React from 'react';
import ingredientDetailsStyles from './ingredientDetails.module.css';

const IngredientDetails = ({data}) => {

return (
    <>
        <img src={data.image} className={ingredientDetailsStyles.img} alt={data.name} />
        <p className='text text_type_main-medium mt-4 mb-8'>{data.name}</p>
        <ul className={`${ingredientDetailsStyles.list} mb-15`}>
          <li className={`${ingredientDetailsStyles.listItem} mr-5`}>
            <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
            <p className='text text_type_main-default text_color_inactive'>{data.calories}</p>
          </li>
          <li className={`${ingredientDetailsStyles.listItem} mr-5`}>
            <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
            <p className='text text_type_main-default text_color_inactive'>{data.proteins}</p>
          </li>
          <li className={`${ingredientDetailsStyles.listItem} mr-5`}>
            <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
            <p className='text text_type_main-default text_color_inactive'>{data.fat}</p>
          </li>
          <li className={`${ingredientDetailsStyles.listItem}`}>
            <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
            <p className='text text_type_main-default text_color_inactive'>{data.carbohydrates}</p>
          </li>
        </ul>
    </>
)
}

export default IngredientDetails;