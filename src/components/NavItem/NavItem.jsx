import React, {useState} from 'react';
import navItemStyles from './NavItem.module.css'

const NavItem = (props) => {
  
  return (
    <a className={`${navItemStyles.navItem} mb-4 mt-4 mr-2 p-5`}>
      {props.children}
        <p className="text text_type_main-default ml-2">{props.text}</p>
    </a>
  );
};

export default NavItem;