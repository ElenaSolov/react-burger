import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import mobileMenuStyles from "./mobileMenu.module.css";
import NavItem from "../navItem/NavItem";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/authActions";

const MobileMenu = ({ onClose }) => {
  const menuRoot = document.getElementById("root");
  const [windowDimension, setWindowDimension] = useState(null);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const className = `${mobileMenuStyles.link} ${mobileMenuStyles.inactive} text text_type_main-small`;
  const activeClassName = `${mobileMenuStyles.link} text text_type_main-small`;

  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  }

  const closeByEsc = useCallback(
      (evt) => {
        if (evt.key === "Escape") {
          onClose();
        }
      },
      [onClose]
  );
  useEffect(() => {
    setWindowDimension(window.innerWidth);
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
      onClose();
    };
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
        <CloseIcon onClick={onClose} type='primary' />
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
            {active
                ? <ArrowUpIcon
                type={pathname.includes("/profile") ? "primary" : "secondary"}
            />
            : <ArrowDownIcon
                    type={pathname.includes("/profile") ? "primary" : "secondary"}
                />}
            <input
              className={mobileMenuStyles.input}
              type="checkbox"
              id="touch"
              onClick={toggleActive}
            ></input>
            <ul className={mobileMenuStyles.sublist}>
              <li>
                <NavLink
                    end
                    onClick={() => {
                      onClose();
                    }}
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
                    onClick={() => {
                      onClose();
                    }}
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
                      onClose();
                    }}
                    className={className}
                >
                  Выход
                </NavLink>
              </li>
            </ul>
          </div>

        </li>
        <li onClick={() => {
          onClose();
        }}>
          <NavItem
            text="Конструктор"
            Icon={BurgerIcon}
            type={pathname === "/" ? "primary" : "secondary"}
            path="/"
          />
        </li>
        <li onClick={() => {
          onClose();
        }}>
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
MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default MobileMenu;
