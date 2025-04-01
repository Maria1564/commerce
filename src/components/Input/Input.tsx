import classNames from 'classnames';
import React from 'react';
import style from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */

  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ afterSlot, className, onChange, value, ...otherProp }, ref) => {
    return (
      <div className={classNames(style.input, className)}>
        <input
          {...otherProp}
          ref={ref}
          className={style.input__field}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
        />
        {afterSlot && <span className={style.input__icon}>{afterSlot}</span>}
      </div>
    );
  },
);

export default React.memo(Input);
