import React, { createContext, useContext } from 'react';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import { FavoritePageStore } from './FavoritePageStore';

const FavoritePageContext = createContext<FavoritePageStore | null>(null);

type FavoriteProps = {
  children: React.ReactNode;
};

export const FavoritePageProvider: React.FC<FavoriteProps> = ({ children }) => {
  const favoritePageStore = useLocalStore(() => new FavoritePageStore());

  return <FavoritePageContext.Provider value={favoritePageStore}>{children}</FavoritePageContext.Provider>;
};

export const useFavoritePageContext = () => {
  const store = useContext(FavoritePageContext);
  if (!store) {
    throw new Error('Use FavoritePageStoreProvider in parent component');
  }
  return store;
};
