import React from 'react';
import headerStyles from './appHeader.module.css'
import NavItem from "../navItem/NavItem";
import PropTypes from 'prop-types';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  
  const [current, setCurrent] = React.useState('Конструктор');
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.navBar}>
        <ul className={headerStyles.navlist}>
          <li>
            <NavItem
              value="Конструктор"
              active={current === 'Конструктор'} onClick={setCurrent}
              text='Конструктор'
              icon = {BurgerIcon}
              type={(current === 'Конструктор') ? 'primary' : 'secondary'}/>
          </li>
          <li>
            <NavItem value="Лента"
               active={current === 'Лента'}
               onClick={setCurrent}
               text='Лента заказов'
               icon = {ListIcon}
               type={(current === 'Лента') ? 'primary' : 'secondary'}/>
          </li>
        </ul>
      </nav>
      <Logo />
      <NavItem
        value="Кабинет"
        active={current === 'Кабинет'}
        onClick={setCurrent}
        text='Личный кабинет'
        icon = {ProfileIcon}
        type={(current === 'Кабинет') ? 'primary' : 'secondary'}/>
    </header>
  );
};

export default AppHeader;
