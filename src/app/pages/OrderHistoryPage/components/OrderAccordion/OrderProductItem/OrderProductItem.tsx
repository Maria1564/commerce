import React from 'react';
import { Text } from 'components/Text';
import { ProductsCart } from 'store/RootStore/CartStore/CartStore';
import style from './OrderProductItem.module.scss';

type OrderProductItemProps = {
  product: ProductsCart;
};

const OrderProductItem: React.FC<OrderProductItemProps> = ({ product }) => {
  return (
    <div className={style[`product-item`]}>
      <Text view="p-18" color="primary">
        {product.title}
      </Text>
      <Text tag="span" color="secondary" view="p-16">
        {product.count} х ${product.discountedPrice ? product.discountedPrice : product.price}
      </Text>
    </div>
  );
};

export default OrderProductItem;
