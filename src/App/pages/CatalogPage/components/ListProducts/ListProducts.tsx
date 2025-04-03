import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { ProductListStore } from 'store/ProductsListStore/ProductsListStore';
import rootStore from 'store/RootStore/instance';
import { ProductModel } from 'store/models/product/product';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';
import CardItem from './CardItem';
import style from './ListProducts.module.scss';

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const productsStore = useLocalStore(() => new ProductListStore());

  // получение списка товаров
  useEffect(() => {
    if (Object.keys(rootStore.queryParams.params).length) {
      const params = {
        populate: ['images', 'productCategory'],
        pagination: {
          pageSize: 9,
          page: Number(rootStore.queryParams.params.page),
        },
        ...((rootStore.queryParams.params.search || rootStore.queryParams.params.category) && {
          filters: {
            ...(rootStore.queryParams.params.search && {
              title: {
                $containsi: rootStore.queryParams.params.search,
              },
            }),

            ...(rootStore.queryParams.params.category && {
              productCategory: {
                title: {
                  $containsi: rootStore.queryParams.params.category.split(','),
                },
              },
            }),
          },
        }),
        ...(rootStore.queryParams.params.sort && { sort: rootStore.queryParams.params.sort }),
      };

      productsStore.getProducts(params);
    }
  }, [rootStore.queryParams.params]);

  useEffect(() => {
    if (productsStore.meta === Meta.success) {
      setProducts(productsStore.allProducts);
    }
  }, [productsStore.allProducts, productsStore.meta]);

  return (
    <div className={style.products}>
      <div className={style.products__total}>
        <Text className={style.products__text}>Total products</Text>
        <Text view="p-20" tag="span" color="accent" weight="bold">
          {productsStore.total}
        </Text>
      </div>
      <div className={style.products__list}>
        {productsStore.meta === Meta.loading && <Loader />}
        {productsStore.meta === Meta.success && products.map((item) => <CardItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default observer(ListProducts);
