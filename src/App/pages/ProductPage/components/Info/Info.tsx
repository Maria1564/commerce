import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { useProductPageContext } from 'store/ProductPageStore/ProductsPageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { Meta } from 'utils/meta';
import style from './Info.module.scss';

const Info: React.FC = () => {
  const { id } = useParams();
  const { productStore } = useProductPageContext();
  const { cart } = useRootStoreContext();

  //получение данных о выбранном товаре
  useEffect(() => {
    const params = {
      populate: 'images',
    };

    productStore.getSelectedProduct(id!, params);
  }, [id, productStore]);

  const addProductCart = useCallback(() => {
    if (productStore.product) {
      cart.addProduct(productStore.product);
    }
  }, [cart, productStore.product]);

  return (
    <>
      {productStore.meta === Meta.loading && <Loader />}
      {productStore.meta === Meta.success && (
        <div className={style.info}>
          <img src={productStore.product?.urlImage} className={style.info__image} />

          <div className={style.info__wrapper}>
            <Text view="title" color="primary">
              {productStore.product?.title}
            </Text>
            <Text view="p-20" color="secondary" className={style.info__description}>
              {productStore.product?.description}
            </Text>
            <Text view="title" color="primary">
              ${productStore.product?.price}
            </Text>
            <div className={style.info__actions}>
              {/* <Button>Buy now</Button> */}
              <Button className={style.info__btn_outline} onClick={addProductCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Info);
