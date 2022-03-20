import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import img from './../../images/bun1.png';
import constructorElStyles from './constructorEl.module.css';
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorEl = () => {
  return (
    <ul className={`${constructorElStyles.list} mt-25`}>
      <li className={`${constructorElStyles.item} ml-8 mb-4`}>
        <ConstructorElement
        isLocked={true}
        type="top"
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={img}
      />
      </li>
      <li className={`${constructorElStyles.item} mb-4`}>
        <DragIcon type={"primary"} />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </li>
      <li className={`${constructorElStyles.item} ml-8 mb-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img}
        />
      </li>
    </ul>
  );
};

export default ConstructorEl;