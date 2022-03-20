import React from 'react';
import headerStyles from './appHeader.module.css'
import NavBar from "../navBar/NavBar";
import {Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import NavItem from "../navItem/NavItem";

class AppHeader extends React.Component {

    render() {
        console.log(this.props)
        return (
            <header className= {headerStyles.header}>
            <NavBar/>
            <Logo/>
            <NavItem text='Личный кабинет'><ProfileIcon type='primary'/></NavItem>
            </header>)
    }
}

export default AppHeader;