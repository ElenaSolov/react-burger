import React from 'react';
import navItemStyles from './navItem.module.css';
import PropTypes from "prop-types";

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
NavItem.propTypes = {
  props: PropTypes.exact({
    active: PropTypes.bool,
    icon: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
    onClick: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
    }
  )
}
export default NavItem;