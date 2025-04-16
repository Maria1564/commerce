import React from "react";
import { Text } from "components/Text";
import logoIcon from "../../assets/logo.png";
import style from "./Header.module.scss"

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <img src={logoIcon} alt="logo" />
      <Text view="p-20" weight="bold" color="primary">Lalasia</Text>
    </div>
  );
};

export default Header;
