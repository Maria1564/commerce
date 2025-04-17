import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { useCartPageContext } from 'store/CartPageStore/CartPageProvider';
import style from './InputField.module.scss';

type InputFieldProps = {
    label: string,
    valueInput: "phone" | "address"
}

const InputField: React.FC<InputFieldProps> = ({label, valueInput}) => {
  const {orderFormStore} = useCartPageContext()

  const handleChange = useCallback(
    (value: string) => {
      if(valueInput === "address") {
       orderFormStore.setAddress(value)
      }else {
        orderFormStore.setPhone(value)
      }
    },  
    [orderFormStore, valueInput],
  );

  return (
    <>
    <label>
     {label}
      <Input onChange={handleChange} value={orderFormStore[valueInput].value} className={style.field__input} required/>
    </label>
    {orderFormStore[valueInput].errorMessage && <Text className={style.field__error}>{orderFormStore[valueInput].errorMessage}</Text>}
    </>
  );
};

export default observer(InputField);
