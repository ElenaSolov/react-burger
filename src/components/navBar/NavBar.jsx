import React, {Component} from 'react';
import NavItem from "../navItem/NavItem";
import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import navBarStyles from './navBar.module.css'

class NavBar extends Component {

    render() {
        return (
            <nav className={navBarStyles.navBar}>
                <ul className={navBarStyles.navlist}>
                    <li>
                        <NavItem value="Конструктор" text='Конструктор'><BurgerIcon type="primary"/></NavItem>
                    </li>
                    <li>
                        <NavItem value="Лента" text='Лента заказов'><ListIcon type="primary"/></NavItem>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;