import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { useCartPageContext } from 'store/CartPageStore/CartPageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { InputField } from './InputField';
import style from './OrderSummary.module.scss';

const OrderSummary: React.FC = () => {
  const { cart, orderHistory } = useRootStoreContext();
  const { orderFormStore } = useCartPageContext();

  const handleSubmit = () => {
    const isValidate = orderFormStore.validate();
    if (isValidate) {
      alert('Заказ принят');
      let products = cart.productsList.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        count: item.count,
      }));
      orderHistory.addOrder(products, cart.totalCartAmount);
      cart.clearCart();
      orderFormStore.setAddress('');
      orderFormStore.setPhone('');
    }
  };
  return (
    <div className={style[`order-summary`]}>
      <div className={style[`order-summary__delivery-address`]}>
        <InputField label="Укажите адрес пункта выдачи" valueInput="address" />
        <InputField label="Укажите ваш номер телефона" valueInput="phone" />
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
        {
          <Button disabled={!cart.totalCartAmount} onClick={handleSubmit}>
            Заказать
          </Button>
        }
      </div>
    </div>
  );
};

export default observer(OrderSummary);
