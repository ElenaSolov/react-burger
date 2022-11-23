import { NavLink } from "react-router-dom";
import { useDispatch } from "../../services/hooks";
import { logout } from "../../services/actions/authActions";
import profileNavStyles from "./profileNav.module.css";
import { FC } from "react";

const ProfileNav: FC = () => {
  const dispatch = useDispatch();
  const className = `${profileNavStyles.profileLink} text text_type_main-medium text_color_inactive`;
  const activeClassName = `${profileNavStyles.profileLink} ${profileNavStyles.profileLinkActive} text text_type_main-medium`;

  return (
    <div className={profileNavStyles.profile}>
      <NavLink
        end
        to="/profile"
        className={({ isActive }) => (isActive ? activeClassName : className)}
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={({ isActive }) => (isActive ? activeClassName : className)}
      >
        История заказов
      </NavLink>
      <NavLink
        to="/"
        onClick={() => {
          dispatch(logout());
        }}
        className={className}
      >
        Выход
      </NavLink>
      <p
        className={`${profileNavStyles.text} text text_type_main-default mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

export default ProfileNav;
