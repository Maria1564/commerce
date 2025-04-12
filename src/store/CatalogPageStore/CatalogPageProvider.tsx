import { createContext, useContext } from 'react';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import { CatalogPageStore } from './CatalogPageStore';

const CatalogPgeContext = createContext<CatalogPageStore | null>(null);

type CatalogPageProviderProps = {
  children: React.ReactNode;
};

export const CatalogPageProvider: React.FC<CatalogPageProviderProps> = ({ children }) => {
  const rootStore = useRootStoreContext()
  const catalogPageStore = useLocalStore(() => new CatalogPageStore(rootStore));
  return <CatalogPgeContext.Provider value={catalogPageStore}>{children}</CatalogPgeContext.Provider>;
};

export const useCatalogPageContext = () => {
  const store = useContext(CatalogPgeContext);
  if (!store) {
    throw new Error('Use CatalogPageStoreProvider in parent component');
  }
  return store;
};
