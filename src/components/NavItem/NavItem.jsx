import React from 'react';
import navItemStyles from './NavItem.module.css'

const NavItem = (props) => {
  const classes = props.active ?
    `${navItemStyles.navItem} mb-4 mt-4 mr-2 p-5`
    : `${navItemStyles.navItem} ${navItemStyles.inactive} mb-4 mt-4 mr-2 p-5`;

  return (
    <a className={`${classes}`} onClick={()=>props.onClick(props.value)}>
      <props.icon type={props.type}/>
        <p className="text text_type_main-default ml-2">{props.text}</p>
    </a>
  );
};

export default NavItem;