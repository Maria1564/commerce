import React from 'react';
import "./Input.scss"

export type InputProps = Omit<
React.InputHTMLAttributes<HTMLInputElement>,
'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({afterSlot, className, onChange, value, ...otherProp}, ref) => {
    
    return (
      <>
        <input {...otherProp} ref={ref} className={`inp ${className}`} value={value} onChange={(e)=>onChange(e.target.value)} type='text'/>
        {afterSlot && <span className='inp_icon'>{afterSlot}</span>}
      </>
      
    )
  });

export default React.memo(Input);