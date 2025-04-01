import React, { useEffect } from 'react';
import { useQueryContext } from 'app/provider/QueryContext';
import Text from 'components/Text';
import Filter from './components/Filter';
import ListProducts from './components/ListProducts';
import Pagination from './components/Pagination';

import style from './CatalogPage.module.scss';

const CatalogPage: React.FC = () => {
  const queryContext = useQueryContext();
  const { values, updaterQueryParams } = queryContext;

  useEffect(() => {
    for (let key in values) {
      updaterQueryParams({ [key]: values[key] });
    }
  }, []);

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

export default CatalogPage;
