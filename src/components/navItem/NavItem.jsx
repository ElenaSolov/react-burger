import React from "react";
import navItemStyles from "./navItem.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavItem = ({ type, value, Icon, text, path, margin }) => {
  let marginLeft = null;
  if (margin) marginLeft = "ml-2";
  const className = `${navItemStyles.navItem} ${marginLeft} ${navItemStyles.inactive} mb-4 mt-4 mr-5 pt-4 pb-4`;
  const activeClassName = `${navItemStyles.navItem} ${marginLeft} mb-4 mt-4 mr-5 pt-4 pb-4`;

  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? activeClassName : className)}
    >
      <Icon type={type} />
      <p className="text text_type_main-default ml-2">{text}</p>
    </NavLink>
  );
};
NavItem.propTypes = {
  Icon: PropTypes.PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  margin: PropTypes.bool,
};
export default NavItem;
