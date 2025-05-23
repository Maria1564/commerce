import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { ProductsCart } from 'store/RootStore/CartStore/CartStore';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import style from './ProductItem.module.scss';

type ProductItemProps = {
  product: ProductsCart;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { cart } = useRootStoreContext();
  const navigate = useNavigate();

  const onDecrementProduct = useCallback(() => {
    cart.decrementProductById(product.id);
  }, [cart, product.id]);

  const onIncrementProduct = useCallback(() => {
    cart.incrementProductById(product.id);
  }, [cart, product.id]);

  const onRemoveProduct = useCallback(() => {
    cart.removeProductById(product.id);
  }, [cart, product.id]);

  const onNavigate = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  return (
    <div className={style.product}>
      <div className={style.product__info}>
        <img src={product.imgUrl} alt={product.title} width={150} height={150} />
        <div className={style.product__content} onClick={onNavigate}>
          <Text view="p-20" color="primary" weight="bold" className={style.product__title}>
            {product.title}
          </Text>
          <div className="">

          <Text color="primary" view="p-18" className={classNames(product.discountedPrice && style.product__price_old)}>
            ${product.price}
          </Text>
          {product.discountedPrice ? <Text color="primary" view="p-18">
            ${product.discountedPrice}
          </Text>: null}
          </div>
        </div>
      </div>

      <div className={style.product__actions}>
        <div className={style.product__counter}>
          <div
            className={classNames(
              style[`product__btn-counter`],
              product.count === 1 && style[`product__btn-counter_disable`],
            )}
            onClick={product.count > 1 ? onDecrementProduct : undefined}
          >
            -
          </div>
          <output>{product.count}</output>
          <div className={style[`product__btn-counter`]} onClick={onIncrementProduct}>
            +
          </div>
        </div>
        <Text color="primary" weight="medium" view="p-18">
          ${(product.count * (product.discountedPrice ? product.discountedPrice : product.price))}
        </Text>
        <Button onClick={onRemoveProduct}>Удалить</Button>
      </div>
    </div>
  );
};

export default React.memo(observer(ProductItem));
