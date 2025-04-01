import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Text from 'components/Text';
import { normalizeProductApi, ProductApi, ProductModel } from 'store/model/product/product';

import { apiClient } from 'utils/axiosConfig';

import CardItem from './CardItem';
import style from './RelatedProducts.module.scss';

const RelatedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const params = {
      populate: ['images', 'productCategory'],
      pagination: {
        pageSize: 3,
        page: Math.floor(Math.random() * 4) + 1,
      },
    };

    apiClient
      .get(`/products?${qs.stringify(params)}`)
      .then(({ data }) => setProducts(data.data.map((item: ProductApi) => normalizeProductApi(item))));
  }, [id]);

  return (
    <div className={style[`related-products`]}>
      <Text view="title">Related Items</Text>
      <div className={style[`related-products__list`]}>
        {products.map((item) => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
