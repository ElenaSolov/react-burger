import React from 'react';
import headerStyles from './AppHeader.module.css'
import NavItem from "../NavItem/NavItem";

const AppHeader = ({icons}) => {
  
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
              icon = {icons.BurgerIcon}
              type={(current === 'Конструктор') ? 'primary' : 'secondary'}/>
          </li>
          <li>
            <NavItem value="Лента"
               active={current === 'Лента'}
               onClick={setCurrent}
               text='Лента заказов'
               icon = {icons.ListIcon}
               type={(current === 'Лента') ? 'primary' : 'secondary'}/>
          </li>
        </ul>
      </nav>
      {icons.Logo()}
      <NavItem
        value="Кабинет"
        active={current === 'Кабинет'}
        onClick={setCurrent}
        text='Личный кабинет'
        icon = {icons.ProfileIcon}
        type={(current === 'Кабинет') ? 'primary' : 'secondary'}/>
    </header>
  );
};

export default AppHeader;
