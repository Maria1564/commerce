import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { ProductModel } from 'store/models/product/product';
import { Rating } from './Rating';
import style from './CardItem.module.scss';

type CardItemProps = {
  item: ProductModel;
};

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const { cart } = useRootStoreContext();
  const onClick = useCallback(() => {
    navigate(`/product/${item.id}`);
  }, [item.id, navigate]);

  const addProductCart = useCallback(() => {
    cart.addProduct(item);
  }, [cart, item]);

  return (
    <Card
      image={item.urlImage}
      captionSlot={
        <div className={style.card__caption}>
          {item.category}
          <Rating rating={item.rating} />
        </div>
      }
      title={item.title}
      subtitle={item.description}
      contentSlot={
        <>
          <Text
            tag="span"
            view="p-18"
            weight="bold"
            className={classNames(item.discountedPrice && style.card__price_old)}
          >
            ${item.price}
          </Text>
          {item.discountedPrice ? (
            <Text tag="span" view="p-18" weight="bold">
              ${item.discountedPrice}
            </Text>
          ) : null}
        </>
      }
      actionSlot={
        item.isInStock ? (
          <Button onClick={addProductCart}>добавить</Button>
        ) : (
          <Text tag="span" view="p-16" color="primary">
            Нет в наличии
          </Text>
        )
      }
      onClick={onClick}
    />
  );
};

export default React.memo(CardItem);
