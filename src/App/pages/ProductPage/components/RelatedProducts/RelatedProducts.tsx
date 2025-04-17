import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { SkeletonCard } from 'components/Card/Skeleton';
import { Text } from 'components/Text';
import { useProductPageContext } from 'store/ProductPageStore/ProductsPageProvider';
import { Meta } from 'utils/meta';
import { CardItem } from './CardItem';
import style from './RelatedProducts.module.scss';

const RelatedProducts: React.FC = () => {
  const { productsStore, productStore } = useProductPageContext();
  const { id } = useParams();

  useEffect(() => {
    const params = {
      priceMin: String(Number(productStore.product?.price) - 20),
      priceMax: String(Number(productStore.product?.price) + 20),
      excludeId: String(productStore.product?.id),
    };

    productsStore.getProducts(params, 3);
  }, [id, productStore.product, productsStore]);

  return (
    <div className={style[`related-products`]}>
      <Text view="title" color="primary">
        Related Items
      </Text>
      <div className={style[`related-products__list`]}>
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

export default observer(RelatedProducts);
