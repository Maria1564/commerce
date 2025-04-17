import classNames from 'classnames';
import React, { useState } from 'react';
import { Text } from 'components/Text';
import { Order } from 'store/RootStore/OrderHistoryStore/OrderHistoryStore';
import { OrderProductItem } from './OrderProductItem';
import style from './OrderAccordion.module.scss';

type OrderAccordionProps = {
  order: Order;
};

const OrderAccordion: React.FC<OrderAccordionProps> = ({ order }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const statusMap: { [key: string]: string } = {
    processing: 'red',
    shipped: 'yellow',
    delivered: 'blue',
  };

  return (
    <div className={classNames(style.accordion, isOpen && style.accordion_active)} onClick={handleToggle}>
      <div className={style.accordion__header}>
        <div className={style.accordion__info}>
          <Text tag="span" view="p-20" weight="bold" color="primary">
            Заказ #{order.id}
          </Text>
          <div className={classNames(style.accordion__status, style[`accordion__status_${statusMap[order.status]}`])}>
            {order.status}
          </div>
        </div>
        <Text view="p-18" color="primary" tag="span" weight="medium" className={style.accordion__total}>
          ${order.total}
        </Text>
      </div>
      <div className={style[`accordion__products-list`]}>
        {order.products.map((item) => (
          <OrderProductItem key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderAccordion;
