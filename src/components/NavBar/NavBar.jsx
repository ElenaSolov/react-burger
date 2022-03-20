import React, {Component} from 'react';
import NavItem from "../NavItem/NavItem";
import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import navBarStyles from './NavBar.module.css'

class NavBar extends Component {
  constructor() {
    super();
    this.state = {current: 'Конструктор'};
  }
  
  
  render() {
    return (
      <nav className={navBarStyles.navBar}>
        <ul className={navBarStyles.navlist}>
          <li>
            <NavItem value="Конструктор" active={this.current === 'Конструктор'} onClick={()=>{this.setCurrent({current: this.value})}} text='Конструктор'><BurgerIcon /></NavItem>
          </li>
          <li>
            <NavItem value="Лента" active={this.current === 'Лента'} onClick={this.setCurrent} text='Лента заказов'><ListIcon /></NavItem>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;