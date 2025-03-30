import classNames from "classnames";
import React from "react";

import Loader from "../Loader";
import "./Button.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, ...other }) => {
  return (
    <button
      style={{ padding: loading ? "14px 20px" : "17px 20px" }}
      {...other}
      className={classNames({
        [other.className as string]: other.className,
        "btn-disable": other.disabled,
        "btn-hover": !other.disabled && !loading,
      })}
      disabled={other.disabled || loading}
    >
      {loading && <Loader className="button__loader" size="s" />}
      {children}
    </button>
  );
};

export default Button;
