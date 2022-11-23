import React, { useEffect, useRef } from "react";
import IngredientCard from "../ingredientCard/IngredientCard";
import ingredientsListStyles from "./ingredientsList.module.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {orderBun, orderIngredient, setCurrentTab} from "../../services/actions/actions.js";
import { getCurrentTab, addScroll } from "../../utils/utils.js";
import { v4 as uuidv4 } from "uuid";

const IngredientsList = () => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const dispatch = useDispatch();
  const bunsSectionRef = useRef(null);
  const saucesSectionRef = useRef(null);
  const mainsSectionRef = useRef(null);
  const current = useSelector((store) => store.ingredients.currentTab);
  const setCurrent = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    dispatch(setCurrentTab(ref.current.id));
  };

  const addToConstructor = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch(orderBun(ingredient));
    }  else {
      const key = uuidv4();
      dispatch(orderIngredient({ ...ingredient, key }));
    }
  };

  useEffect(() => {
    addScroll(".ingredientsScroll");
  }, [dispatch]);

  return (
    <>
      <ul className={`${ingredientsListStyles.tabs} mt-5 tabs`}>
        <li>
          <a className={`${ingredientsListStyles.tabLink} tabLink`}>
            <Tab
              value="Булки"
              active={current === "Булки"}
              onClick={() => setCurrent(bunsSectionRef)}
            >
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a className={`${ingredientsListStyles.tabLink} tabLink`}>
            <Tab
              value="Соусы"
              active={current === "Соусы"}
              onClick={() => setCurrent(saucesSectionRef)}
            >
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a className={`${ingredientsListStyles.tabLink} tabLink`}>
            <Tab
              value="Начинки"
              active={current === "Начинки"}
              onClick={() => setCurrent(mainsSectionRef)}
            >
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <section
        onScroll={() => dispatch(setCurrentTab(getCurrentTab()))}
        className={`${ingredientsListStyles.ingredientsSection} ingredientsScroll`}
      >
        <h2
          id="buns"
          className={`${ingredientsListStyles.header} mt-10 header tab`}
        >
          Булки
        </h2>
        <ul
          ref={bunsSectionRef}
          className={`${ingredientsListStyles.list} ingredients__list`}
          id="Булки"
        >
          {ingredients
            .filter((ingredient) => ingredient["type"] === "bun")
            .map((ingredient) => {
              return (
                <article key={ingredient._id}>
                  <IngredientCard
                    ingredient={ingredient}
                  />
                  <button
                    type="button"
                    className={`${ingredientsListStyles.btn} text text_type_main-default`}
                    onClick={()=> addToConstructor(ingredient)}
                  >
                    Добавить
                  </button>
                </article>
              );
            })}
        </ul>
        <h2 id="sauces" className={`${ingredientsListStyles.header} mt-10 tab`}>
          Соусы
        </h2>
        <ul
          ref={saucesSectionRef}
          className={`${ingredientsListStyles.list} ingredients__list`}
          id="Соусы"
        >
          {ingredients
            .filter((ingredient) => ingredient["type"] === "sauce")
            .map((ingredient) => {
              return (
                  <article key={ingredient._id}>
                    <IngredientCard
                        ingredient={ingredient}
                    />
                    <button
                        type="button"
                        className={`${ingredientsListStyles.btn} text text_type_main-default`}
                        onClick={()=> addToConstructor(ingredient)}
                    >
                      Добавить
                    </button>
                  </article>
              );
            })}
        </ul>
        <h2 id="mains" className={`${ingredientsListStyles.header} mt-10 tab`}>
          Начинки
        </h2>
        <ul
          ref={mainsSectionRef}
          className={`${ingredientsListStyles.list} ingredients__list`}
          id="Начинки"
        >
          {ingredients
            .filter((ingredient) => ingredient["type"] === "main")
            .map((ingredient) => {
              return (
                  <article key={ingredient._id}>
                    <IngredientCard
                        ingredient={ingredient}
                    />
                    <button
                        type="button"
                        className={`${ingredientsListStyles.btn} text text_type_main-default`}
                        onClick={()=> addToConstructor(ingredient)}
                    >
                      Добавить
                    </button>
                  </article>
              );
            })}
        </ul>
      </section>
    </>
  );
};

export default IngredientsList;
