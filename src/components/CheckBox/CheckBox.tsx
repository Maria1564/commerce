import classNames from 'classnames';
import React, { useCallback } from 'react';

import CheckmarkIcon from "./CheckmarkIcon"
import "./CheckBox.scss"

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  // eslint-disable-next-line no-unused-vars
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, disabled, ...other }) => {
  const handlerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked), [onChange])
  return (
    <div className={classNames("checkbox_wrapper", other.className, {"checked_wrap_dis": disabled })}>
      {other.checked && (
        <CheckmarkIcon width={40} height={40} className='checkbox_icon' color='accent'/>
      )}
      <input
        {...other}
        className="checkbox"
        type="checkbox"
        checked={other.checked as boolean}
        onChange={!disabled ? handlerChange : () => {}}
      />
    </div>
  );
};

export default CheckBox;