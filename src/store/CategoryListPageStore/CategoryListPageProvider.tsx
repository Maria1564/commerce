import React, { createContext, useContext } from 'react';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import { CategoryListPageStore } from './CategoryListPageStore';

const CategoryListPageContext = createContext<CategoryListPageStore | null>(null);

type CategoriesProps = {
  children: React.ReactNode;
};

export const CategoryListPageProvider: React.FC<CategoriesProps> = ({ children }) => {
  const categoryPageStore = useLocalStore(() => new CategoryListPageStore());

  return <CategoryListPageContext.Provider value={categoryPageStore}>{children}</CategoryListPageContext.Provider>;
};

export const useCategoryListContext = () => {
  const store = useContext(CategoryListPageContext);
  if (!store) {
    throw new Error('Use CategoryListStoreProvider in parent component');
  }
  return store;
};
