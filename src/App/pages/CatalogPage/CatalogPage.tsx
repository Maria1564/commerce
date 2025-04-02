import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import Filter from './components/Filter';
import ListProducts from './components/ListProducts';
import Pagination from './components/Pagination';

import style from './CatalogPage.module.scss';

const CatalogPage: React.FC = () => {
  const [_, setSearchParams] = useSearchParams();

  console.log('render catalog', toJS(rootStore.queryParams.params));

  useEffect(() => {
    const newParams = new URLSearchParams();
    for (let key in rootStore.queryParams.params) {
      newParams.set(key, rootStore.queryParams.params[key]);
    }
    setSearchParams(newParams);
  }, [rootStore.queryParams.params]);

  return (
    <div className={style.catalog}>
      <div className={style.catalog__title}>
        <Text view="title" weight="bold">
          Products
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
