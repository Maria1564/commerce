import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
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
  const navigate = useNavigate();

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

  const handleBuyNow = useCallback(() => {
    if (productStore.product) {
      cart.addProduct(productStore.product);
    }
    navigate('/cart');
  }, [cart, navigate, productStore.product]);

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
            <div>
              <Text
                view="title"
                color="primary"
                className={classNames(productStore.product?.discountedPrice && style.info__price_old)}
              >
                ${productStore.product?.price}
              </Text>
              {productStore.product?.discountedPrice ? (
                <Text view="title" color="primary">
                  ${productStore.product?.discountedPrice}
                </Text>
              ) : null}
            </div>
            <div className={style.info__actions}>
              {productStore.product?.isInStock ? (
                <>
                  <Button onClick={handleBuyNow}>купить</Button>
                  <Button className={style.info__btn_outline} onClick={addProductCart}>
                    добавить
                  </Button>
                </>
              ) : (
                <Text tag="span" view="p-20" color="primary">
                  Нет в наличии
                </Text>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Info);
