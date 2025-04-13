import classNames from 'classnames';
import React from 'react';
import { Loader } from '../Loader';
import style from './Button.module.scss';
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, ...other }) => {
  return (
    <button
      style={{ padding: loading ? '14px 20px' : '17px 20px' }}
      {...other}
      className={classNames(style.btn, other.className, other.disabled && style.btn_disabled, {
        [style.btn_hover]: !other.disabled && !loading,
      })}
      disabled={other.disabled || loading}
    >
      {loading && <Loader className={style.btn__loader} size="s" />}
      {children}
    </button>
  );
};

export default React.memo(Button);
