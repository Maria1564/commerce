import { observer } from 'mobx-react-lite';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import { normalizeProductApi, ProductApi, ProductModel } from 'store/model/product/product';
import { apiClient } from 'utils/axiosConfig';
import CardItem from './CardItem';
import style from './ListProducts.module.scss';

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  // получение списка товаров
  useEffect(() => {
    if (Object.keys(rootStore.queryParams.params).length) {
      const params = {
        populate: ['images', 'productCategory'],
        pagination: {
          pageSize: 9,
          page: rootStore.queryParams.params.page,
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
      apiClient.get(`/products?${qs.stringify(params)}`).then(({ data }) => {
        const normalizedProducts = data.data.map((item: ProductApi) => normalizeProductApi(item));
        setProducts(normalizedProducts);
        setTotalProducts(data.meta.pagination.total);
      });
    }
  }, [rootStore.queryParams.params]);

  return (
    <div className={style.products}>
      <div className={style.products__total}>
        <Text className={style.products__text}>Total products</Text>
        <Text view="p-20" tag="span" color="accent" weight="bold">
          {totalProducts}
        </Text>
      </div>
      <div className={style.products__list}>
        {products.map((item) => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default observer(ListProducts);
