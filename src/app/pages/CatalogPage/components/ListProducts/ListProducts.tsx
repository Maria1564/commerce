import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { SkeletonCard } from 'components/Card/Skeleton';
import { Text } from 'components/Text';
import { useCatalogPageContext } from 'store/CatalogPageStore/CatalogPageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { Meta } from 'utils/meta';
import { CardItem } from './CardItem';
import style from './ListProducts.module.scss';

const ListProducts: React.FC = () => {
  const rootStore = useRootStoreContext();
  const { productsStore } = useCatalogPageContext();

  // получение списка товаров
  useEffect(() => {
    if (Object.keys(rootStore.queryParams.params).length) {
      productsStore.getProducts(rootStore.queryParams.params, 9);
    }
  }, [productsStore, rootStore.queryParams.params]);

  return (
    <div className={style.products}>
      <div className={style.products__total}>
        <Text className={style.products__text}>Количество товаров</Text>
        <Text view="p-20" tag="span" color="accent" weight="bold">
          {productsStore.total}
        </Text>
      </div>
      <div className={style.products__list}>
        {productsStore.meta !== Meta.success && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
        {productsStore.meta === Meta.success &&
          productsStore.allProducts.map((item) => <CardItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default observer(ListProducts);
