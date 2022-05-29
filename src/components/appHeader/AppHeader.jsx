import React from "react";
import headerStyles from "./appHeader.module.css";
import NavItem from "../navItem/NavItem";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import img from "../../images/burger_icon.svg";

const AppHeader = () => {
  const [current, setCurrent] = React.useState("Конструктор");
  const openMobileMenu = () => {};
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.header__container}>
        <nav className={headerStyles.navBar}>
          <ul className={headerStyles.navlist}>
            <li>
              <NavItem
                value="Конструктор"
                active={current === "Конструктор"}
                onClick={setCurrent}
                text="Конструктор"
                Icon={BurgerIcon}
                type={current === "Конструктор" ? "primary" : "secondary"}
                path="/"
              />
            </li>
            <li>
              <NavItem
                value="Лента"
                active={current === "Лента"}
                onClick={setCurrent}
                text="Лента заказов"
                Icon={ListIcon}
                type={current === "Лента" ? "primary" : "secondary"}
                path="/feed"
              />
            </li>
          </ul>
        </nav>
        <Link to="/">
          <div className={headerStyles.mainLogo}>
            <Logo />
          </div>
          <img className={headerStyles.smallLogo} src={img} alt="Логотип" />
        </Link>
        <NavItem
          value="Кабинет"
          active={current === "Кабинет"}
          onClick={setCurrent}
          text="Личный кабинет"
          Icon={ProfileIcon}
          type={current === "Кабинет" ? "primary" : "secondary"}
          path="/profile"
        />
        <button
          type="button"
          className={headerStyles.burger}
          onClick={openMobileMenu}
        ></button>
      </div>
    </header>
  );
};

export default AppHeader;
