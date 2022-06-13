import React from "react";
import headerStyles from "./appHeader.module.css";
import NavItem from "../navItem/NavItem";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import img from "../../images/burger_icon.svg";

const AppHeader = () => {
  const openMobileMenu = () => {};
  const { pathname } = useLocation();
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.header__container}>
        <nav className={headerStyles.navBar}>
          <ul className={headerStyles.navlist}>
            <li>
              <NavItem
                value="Конструктор"
                text="Конструктор"
                Icon={BurgerIcon}
                type={pathname === "/" ? "primary" : "secondary"}
                path="/"
              />
            </li>
            <li>
              <NavItem
                value="Лента"
                text="Лента заказов"
                Icon={ListIcon}
                type={pathname === "/feed" ? "primary" : "secondary"}
                path="/feed"
                margin={true}
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
          text="Личный кабинет"
          Icon={ProfileIcon}
          type={pathname === "/profile" ? "primary" : "secondary"}
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
