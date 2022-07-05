import React, { FC } from "react";
import navItemStyles from "./navItem.module.css";
import { NavLink } from "react-router-dom";

interface INavItem {
  type: string;
  Icon: React.ElementType;
  text: string;
  path: string;
  margin?: number;
}
const NavItem: FC<INavItem> = ({ type, Icon, text, path, margin }) => {
  let marginLeft: string | null = null;
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

export default NavItem;
