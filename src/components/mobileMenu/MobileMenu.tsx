import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import mobileMenuStyles from "./mobileMenu.module.css";
import NavItem from "../navItem/NavItem";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  ArrowDownIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, NavLink } from "react-router-dom";
import { useDispatch } from "../../services/hooks";
import { logout } from "../../services/actions/authActions";

interface IMobileMenu {
  onClose: () => void;
}
const MobileMenu: FC<IMobileMenu> = ({ onClose }) => {
  const menuRoot = document.getElementById("root") as HTMLElement;
  const [windowDimension, setWindowDimension] = useState<number>(0);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const className = `${mobileMenuStyles.link} text text_type_main-small text_color_inactive`;
  const activeClassName = `${mobileMenuStyles.link} text text_type_main-small`;

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 768;
  if (!isMobile) onClose();
  return ReactDOM.createPortal(
    <section className={mobileMenuStyles.mobileMenu}>
      <div className={mobileMenuStyles.headerContainer}>
        <h2 className={`${mobileMenuStyles.title} text text_type_main-medium`}>
          Меню
        </h2>
        <CloseIcon type="primary" onClick={onClose} />
      </div>
      <nav className={mobileMenuStyles.list}>
        <li>
          <div className={mobileMenuStyles.item}>
            <label
              htmlFor="touch"
              className={
                pathname.includes("/profile")
                  ? `${activeClassName} ${mobileMenuStyles.label}`
                  : `${className} ${mobileMenuStyles.label}`
              }
            >
              <ProfileIcon
                type={pathname.includes("/profile") ? "primary" : "secondary"}
              />
              Личный кабинет
            </label>
            <ArrowDownIcon
              type={pathname.includes("/profile") ? "primary" : "secondary"}
            />
            <input
              className={mobileMenuStyles.input}
              type="checkbox"
              id="touch"
            />
          </div>
          <ul className={mobileMenuStyles.sublist}>
            <li>
              <NavLink
                end
                to="/profile"
                className={({ isActive }) =>
                  isActive ? activeClassName : className
                }
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  isActive ? activeClassName : className
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  dispatch(logout());
                }}
                className={className}
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </li>
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
          />
        </li>
      </nav>
    </section>,
    menuRoot
  );
};

export default MobileMenu;
