import React from 'react';
import styles from './AppHeader.module.css'
import NavBar from "../NavBar/NavBar";
import {Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import NavItem from "../NavItem/NavItem";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <NavBar />
      <Logo />
      <NavItem text='Личный кабинет'><ProfileIcon /></NavItem>
    </header>
  );
};

export default AppHeader;