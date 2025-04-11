import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import SkeletonCard from 'components/Card/Skeleton';
import Text from 'components/Text';
import { useProductPageContext } from 'store/ProductPageStore/ProductsPageProvider';
import { Meta } from 'utils/meta';
import CardItem from './CardItem';
import style from './RelatedProducts.module.scss';

const RelatedProducts: React.FC = () => {
  const { productsStore } = useProductPageContext();
  const { id } = useParams();

  useEffect(() => {
    productsStore.getProducts({ page: String(Math.floor(Math.random() * 4) + 1) }, 3);
  }, [id]);

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
