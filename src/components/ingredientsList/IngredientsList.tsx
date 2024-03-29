import React, { FC, RefObject, useEffect, useRef } from "react";
import IngredientCard from "../ingredientCard/IngredientCard";
import ingredientsListStyles from "./ingredientsList.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import { setCurrentTab } from "../../services/actions/actions";
import { getCurrentTab, addScroll } from "../../utils/utils";

const IngredientsList: FC = () => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const dispatch = useDispatch();
  const bunsSectionRef = useRef<HTMLUListElement>(null);
  const saucesSectionRef = useRef<HTMLUListElement>(null);
  const mainsSectionRef = useRef<HTMLUListElement>(null);
  const current = useSelector((store) => store.ingredients.currentTab);
  const setCurrent = (ref: RefObject<HTMLUListElement> | null) => {
    if (ref !== null && ref.current !== null) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      dispatch(setCurrentTab(ref.current.id));
    }
  };

  useEffect(() => {
    addScroll(".ingredientsScroll");
  }, [dispatch]);

  return (
    <>
      <ul className={`${ingredientsListStyles.tabs} mt-5 tabs`}>
        <li>
          <a href="/#" className={`${ingredientsListStyles.tabLink} tabLink`}>
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
          <a href="/#" className={`${ingredientsListStyles.tabLink} tabLink`}>
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
          <a href="/#" className={`${ingredientsListStyles.tabLink} tabLink`}>
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
                <IngredientCard key={ingredient._id} ingredient={ingredient} />
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
                <IngredientCard key={ingredient._id} ingredient={ingredient} />
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
                <IngredientCard key={ingredient._id} ingredient={ingredient} />
              );
            })}
        </ul>
      </section>
    </>
  );
};

export default IngredientsList;
