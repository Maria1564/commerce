import classNames from 'classnames';
import React, { useCallback } from 'react';
import { CheckmarkIcon } from './CheckmarkIcon';
import style from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, disabled, ...other }) => {
  const handlerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked), [onChange]);
  return (
    <div className={classNames(style.checkbox, other.className, disabled && style.checkbox_disabled)}>
      {other.checked && <CheckmarkIcon width={40} height={40} className={style.checkbox_icon} color="accent" />}
      <input
        {...other}
        className={style.checkbox__field}
        type="checkbox"
        checked={other.checked}
        onChange={!disabled ? handlerChange : () => {}}
      />
    </div>
  );
};

export default CheckBox;
