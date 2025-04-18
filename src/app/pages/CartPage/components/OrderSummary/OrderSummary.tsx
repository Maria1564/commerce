import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'components/Button';
import { useCartPageContext } from 'store/CartPageStore/CartPageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { InputField } from './InputField';
import { SummaryRow } from './SummaryRow';
import style from './OrderSummary.module.scss';

const OrderSummary: React.FC = () => {
  const { cart, orderHistory } = useRootStoreContext();
  const { orderFormStore } = useCartPageContext();

  const handleSubmit = () => {
    const isValidate = orderFormStore.validate();
    if (isValidate) {
      alert('Заказ принят');
      orderHistory.addOrder(cart.productsList, cart.totalDiscountedAmount);
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
        <SummaryRow label="Сумма товара(ов)" content={`$${cart.totalCartAmount}`} />
        <SummaryRow label="Доставка" content="бесплатно" />
        <SummaryRow label="Скидка" content={`- $${(cart.totalCartAmount - cart.totalDiscountedAmount)}`} />
        <SummaryRow
          className={style[`order-summary__row-total`]}
          label="ИТОГО"
          content={`$${cart.totalDiscountedAmount}`}
        />
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
