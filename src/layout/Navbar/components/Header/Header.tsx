import React from "react";
import logoIcon from "../../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <div>
      <img src={logoIcon} alt="logo" />
    </div>
  );
};

export default Header;
