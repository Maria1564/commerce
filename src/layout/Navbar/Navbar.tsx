import classNames from "classnames";
import React from "react";
import Text from "components/Text";
import BagIcon from "components/icons/BagIcon";
import UserIcon from "components/icons/UserIcon";
import Header from "./components/Header";
import Link from "./components/Link";
import { links } from "./data";
import style from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  return (
    <div className={style.navbar}>
      <div className={classNames("container", style.navbar__container)}>
        <Header />
        <div className={style.navbar__menu}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              isActive={({ isActive }) =>
                isActive ? style.navbar__link_active : ""
              }
              children={
                <Text view="p-18" weight="medium">
                  {link.text}
                </Text>
              }
            />
          ))}
        </div>
        <div className={style.navbar__actions}>
          <BagIcon />
          <UserIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
