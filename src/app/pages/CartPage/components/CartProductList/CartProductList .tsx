import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Text } from 'components/Text';
import { ArrowLeftIcon } from 'components/icons/ArrowLeftIcon';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { ProductItem } from './ProductItem';
import style from './CardProductList.module.scss';

const CartProductList: React.FC = () => {
  const { cart } = useRootStoreContext();
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(-1);
  };

  const onClear = useCallback(() => {
    cart.clearCart();
  }, [cart]);

  return (
    <div className={style[`cart-products`]}>
      <div className={style['cart-products__header']}>
        <Text tag="h2" color="primary" view="title">
          Ваша корзина
        </Text>
        <div onClick={onClear}>
          <Text color="accent" view="p-18" weight="medium" className={style['cart-products__action']}>
            очистить корзину
          </Text>
        </div>
      </div>
      <div className={style[`cart-products__link`]} onClick={onNavigate}>
        <ArrowLeftIcon color="primary" />
        <Text color="primary" weight="medium" view="p-18">
          Назад к каталогу
        </Text>
      </div>
      <div className={style[`cart-products__list`]}>
        {cart.productsList.length ? (
          cart.productsList.map((item) => <ProductItem key={item.id} product={item} />)
        ) : (
          <Text view="p-18" color="primary">
            Корзина пуста
          </Text>
        )}
      </div>
    </div>
  );
};

export default observer(CartProductList);
