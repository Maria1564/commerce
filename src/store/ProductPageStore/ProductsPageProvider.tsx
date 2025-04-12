import { createContext, useContext } from 'react';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import { ProductPageStore } from './ProductPageStore';

const ProductPageContext = createContext<ProductPageStore | null>(null);

type ProductPageProviderProps = {
  children: React.ReactNode;
};

export const ProductPageProvider: React.FC<ProductPageProviderProps> = ({ children }) => {
  const productPageStore = useLocalStore(() => new ProductPageStore());

  return <ProductPageContext.Provider value={productPageStore}>{children}</ProductPageContext.Provider>;
};

export const useProductPageContext = () => {
  const store = useContext(ProductPageContext);
  if (!store) {
    throw new Error('Use ProductPageProvider in parent component');
  }
  return store;
};
