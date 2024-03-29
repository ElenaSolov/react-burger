import React, { FunctionComponent, useState } from "react";
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
import MobileMenu from "../mobileMenu/MobileMenu";

const AppHeader: FunctionComponent = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const openMobileMenu = (): void => {
    setMenuOpen(true);
  };
  return menuOpen ? (
    <MobileMenu onClose={() => setMenuOpen(false)} />
  ) : (
    <header className={headerStyles.header}>
      <div className={headerStyles.header__container}>
        <nav className={headerStyles.navBar}>
          <ul className={headerStyles.navlist}>
            <li>
              <NavItem
                text="Конструктор"
                Icon={BurgerIcon}
                type={pathname === "/" ? "primary" : "secondary"}
                path="/"
              />
            </li>
            <li>
              <NavItem
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
          text="Личный кабинет"
          Icon={ProfileIcon}
          type={pathname.includes("/profile") ? "primary" : "secondary"}
          path="/profile"
        />
        <button
          type="button"
          className={headerStyles.burger}
          onClick={openMobileMenu}
        />
      </div>
    </header>
  );
};

export default AppHeader;
