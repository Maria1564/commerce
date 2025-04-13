import React, { useEffect } from 'react';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { CartProductList } from './CartProductList';
import style from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const { cart } = useRootStoreContext();

  useEffect(() => {
    cart.checkedCart();
  }, [cart]);

  return (
    <div className={style.cart}>
      <CartProductList />
    </div>
  );
};

export default CartPage;
