import React, {useEffect} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTabsStyles from './ingredientTabs.module.css';
import {setTabsListeners} from "../../utils/utils";

class IngredientTabs extends React.Component {
  constructor (){
    super();
    this.state = {current: "Булки"};
    this.setCurrent = this.setCurrent.bind(this);
  }
  
  setCurrent(evt){
    this.setState({current:evt});
  }
  componentDidMount() {
    setTabsListeners();
  }
    render() {
        return (
            <ul className={`${ingredientTabsStyles.tabs} mt-5`}>
                <li>
                    <a href='#buns' className='tabLink'>
                        <Tab value="Булки" active={this.state.current === 'Булки'} onClick={this.setCurrent}>Булки</Tab>
                    </a>
                </li>
                <li>
                    <a href='#sauces' className='tabLink'>
                        <Tab value="Соусы" active={this.state.current === 'Соусы'} onClick={this.setCurrent}>Соусы</Tab>
                    </a>
                </li>
                <li>
                    <a href='#mains' className='tabLink'>
                        <Tab value="Начинки" active={this.state.current === 'Начинки'} onClick={this.setCurrent}>Начинки</Tab>
                    </a>
                </li>
            </ul>
        )
    }
};

export default IngredientTabs;