import React from 'react';
import { Text } from 'components/Text';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { OrderAccordion } from './components/OrderAccordion';
import style from './OrderHistoryPage.module.scss';

const OrderHistoryPage: React.FC = () => {
  const { orderHistory } = useRootStoreContext();

  return (
    <div className={style[`order-history`]}>
      <Text tag="h2" view="title" color="primary" className={style[`order-history__title`]}>
        История заказов
      </Text>
      {orderHistory.orders.length ? (
        <div className={style[`order-history__list`]}>
          {orderHistory.orders.map((item) => (
            <OrderAccordion key={item.id} order={item} />
          ))}
        </div>
      ) : (
        <Text color="primary" view="p-18">
          История пуста
        </Text>
      )}
    </div>
  );
};

export default OrderHistoryPage;
