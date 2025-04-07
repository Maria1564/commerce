import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SkeletonCard from 'components/Card/Skeleton';
import Text from 'components/Text';
import { ProductListStore } from 'store/ProductsListStore/ProductsListStore';
import { ProductModel } from 'store/models/product/product';
import { Meta } from 'utils/meta';
import CardItem from './CardItem';
import style from './RelatedProducts.module.scss';

const RelatedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const productsStore = useLocalStore(() => new ProductListStore());

  const { id } = useParams();

  useEffect(() => {
    const params = {
      populate: ['images', 'productCategory'],
      pagination: {
        pageSize: 3,
        page: Math.floor(Math.random() * 4) + 1,
      },
    };

    productsStore.getProducts(params);
  }, [id]);

  useEffect(() => {
    if (productsStore.meta === Meta.success) {
      setProducts(productsStore.relatedProducts);
    }
  }, [productsStore.meta]);

  return (
    <div className={style[`related-products`]}>
      <Text view="title">Related Items</Text>
      <div className={style[`related-products__list`]}>
        {productsStore.meta !== Meta.success && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
        {productsStore.meta === Meta.success && products.map((item) => <CardItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default observer(RelatedProducts);
