import React from 'react';
import navItemStyles from './navItem.module.css';
import PropTypes from "prop-types";

const NavItem = ({type, active, value, Icon, text, onClick}) => {
  
  const classes = active ?
    `${navItemStyles.navItem} mb-4 mt-4 mr-2 p-5`
    : `${navItemStyles.navItem} ${navItemStyles.inactive} mb-4 mt-4 mr-2 p-5`;

  return (
    <a href='#' className={`${classes}`} onClick={()=>onClick(value)} >
      <Icon type={type} />
        <p className="text text_type_main-default ml-2">{text}</p>
    </a>
  );
};
NavItem.propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
    onClick: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
}
export default NavItem;