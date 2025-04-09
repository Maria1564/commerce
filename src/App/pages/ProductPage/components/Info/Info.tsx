import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { ProductDetailsStore } from 'store/ProductDetailsStore/ProductDetailsStore';
import { ProductModel } from 'store/models/product/product';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';
import style from './Info.module.scss';

const Info: React.FC = () => {
  const [infoProduct, setInfoProduct] = useState<ProductModel | null>(null);
  const { id } = useParams();
  const productStore = useLocalStore(() => new ProductDetailsStore());

  //получение данных о выбранном товаре
  useEffect(() => {
    const params = {
      populate: 'images',
    };

    productStore.getSelectedProduct(id!, params);
  }, [id, productStore]);

  useEffect(() => {
    if (productStore.meta === Meta.success) {
      setInfoProduct(productStore.product);
    }
  }, [productStore.meta, productStore.product]);

  return (
    <>
      {productStore.meta === Meta.loading && <Loader />}
      {productStore.meta === Meta.success && (
        <div className={style.info}>
          <img src={infoProduct?.urlImage} className={style.info__image} />

          <div className={style.info__wrapper}>
            <Text view="title" color="primary">
              {infoProduct?.title}
            </Text>
            <Text view="p-20" color="secondary" className={style.info__description}>
              {infoProduct?.description}
            </Text>
            <Text view="title" color="primary">
              ${infoProduct?.price}
            </Text>
            <div className={style.info__actions}>
              <Button>Buy now</Button>
              <Button className={style.info__btn_outline}>Add to Cart</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Info);
