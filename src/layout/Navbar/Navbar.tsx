import React from "react";
import { NavLink } from "react-router";
import Text from "components/Text";
import BagIcon from "components/icons/BagIcon";
import UserIcon from "components/icons/UserIcon";
import { Routes } from "types/index";
import logoIcon from "./assets/logo.png";
import style from "./Navbar.module.scss";



const Navbar: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={`container ${style.container}`}>
        <img src={logoIcon} alt="logo" />
        <div className={style.menu}>
          <NavLink
            to={Routes.catalog}
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            <Text view="p-18" weight="medium">
              Products
            </Text>
          </NavLink>
          <NavLink to={"/"}
          className={({ isActive }) => (isActive ? style.active : "")}>
            <Text view="p-18" weight="medium">
              Categories
            </Text>
          </NavLink>
          <NavLink to={Routes.about}
          className={({ isActive }) => (isActive ? style.active : "")}>
            <Text view="p-18" weight="medium">
              About us
            </Text>
          </NavLink>
        </div>
        <div className={style.other}>
          <BagIcon/>
          <UserIcon/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
