import React from 'react';
import { Text } from 'components/Text';
import { OrderProduct } from 'store/RootStore/OrderHistoryStore/OrderHistoryStore';
import style from './OrderProductItem.module.scss';

type OrderProductItemProps = {
  product: OrderProduct;
};

const OrderProductItem: React.FC<OrderProductItemProps> = ({ product }) => {
  return (
    <div className={style[`product-item`]}>
      <Text view="p-18" color="primary">
        {product.title}
      </Text>
      <Text tag="span" color="secondary" view="p-16">
        {product.count} х ${product.price}
      </Text>
    </div>
  );
};

export default OrderProductItem;
