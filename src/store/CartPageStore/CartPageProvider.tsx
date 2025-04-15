import React, { createContext, useContext } from 'react';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import { CartPageStore } from './CartPageStore';

const CartPageContext = createContext<CartPageStore | null>(null);

type CartPageProviderProps = {
  children: React.ReactNode;
};

export const CartPageProvider: React.FC<CartPageProviderProps> = ({ children }) => {
  const cartPageStore = useLocalStore(() => new CartPageStore());

  return <CartPageContext.Provider value={cartPageStore}>{children}</CartPageContext.Provider>;
};

export const useCartPageContext = () => {
  const store = useContext(CartPageContext);
  if (!store) {
    throw new Error('Use CartPageProvider in parent component');
  }
  return store;
};
