import React from "react";
import { NavLink } from "react-router";

type LinkProps = {
  to: string;
  isActive: (state: { isActive: boolean }) => string;
  children: React.ReactNode;
};

const Link: React.FC<LinkProps> = ({ to, children, isActive }) => {
  return (
    <NavLink to={to} className={isActive}>
      {" "}
      {children}
    </NavLink>
  );
};

export default Link;
