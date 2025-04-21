import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Text } from 'components/Text';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { Filter } from './components/Filter';
import { ListProducts } from './components/ListProducts';
import { Pagination } from './components/Pagination';
import style from './CatalogPage.module.scss';

const CatalogPage: React.FC = () => {
  const [_, setSearchParams] = useSearchParams();
  const rootStore = useRootStoreContext();

  useEffect(() => {
    rootStore.queryParams.syncWithURL(setSearchParams);
  }, [rootStore.queryParams, rootStore.queryParams.params, setSearchParams]);

  return (
    <div className={style.catalog}>
      <div className={style.catalog__title}>
        <Text view="title" weight="bold">
          Товары
        </Text>
        <Text view="p-20" color="secondary" className={style.catalog__text}>
          {' '}
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>
      <Filter />
      <ListProducts />
      <Pagination />
    </div>
  );
};

export default observer(CatalogPage);
