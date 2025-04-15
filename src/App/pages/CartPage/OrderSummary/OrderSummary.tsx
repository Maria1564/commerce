import classNames from 'classnames';
import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { InputStore } from 'store/InputStore/InputStore';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import style from './OrderSummary.module.scss';

const OrderSummary: React.FC = () => {
  const { cart } = useRootStoreContext();
  const inputStore = useLocalStore(() => new InputStore());

  const handleChange = useCallback((value: string) => {
    inputStore.setValue(value);
  }, []);

  return (
    <div className={style[`order-summary`]}>
      <div className={style[`order-summary__delivery-address`]}>
        <label>
          Укажите адрес пункта выдачи:
          <Input onChange={handleChange} value={inputStore.value} className={style[`order-summary__input`]} />
        </label>
      </div>

      <div className={style[`order-summary__totals`]}>
        <div className={style[`order-summary__row`]}>
          <Text view="p-16" color="secondary" tag="span">
            Сумма товара(ов)
          </Text>
          <Text weight="medium" color="primary" view="p-16">
            ${cart.totalCartAmount}
          </Text>
        </div>
        <div className={style[`order-summary__row`]}>
          <Text view="p-16" color="secondary" tag="span">
            Доставка
          </Text>
          <Text weight="medium" color="primary" view="p-16">
            бесплатно
          </Text>
        </div>
        <div className={classNames(style[`order-summary__row`], style[`order-summary__row-total`])}>
          <Text view="p-16" color="secondary" tag="span">
            ИТОГО
          </Text>
          <Text weight="bold" color="accent" view="p-18">
            ${cart.totalCartAmount}
          </Text>
        </div>
        {<Button disabled={!cart.totalCartAmount}>Заказать</Button>}
      </div>
    </div>
  );
};

export default observer(OrderSummary);
