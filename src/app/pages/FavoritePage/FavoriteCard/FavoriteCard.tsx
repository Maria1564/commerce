import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { FavoriteToggle } from 'components/FavoriteToggle';
import { Text } from 'components/Text';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { ProductModel } from 'store/models/product/product';
import style from './FavoriteCard.module.scss';

type FavoriteCardProps = {
  item: ProductModel;
};

const FavoriteCard: React.FC<FavoriteCardProps> = ({ item }) => {
  const { cart } = useRootStoreContext();
  const navigate = useNavigate();

  const openProductPage = useCallback(() => {
    navigate(`/product/${item.id}`);
  }, [item.id, navigate]);

  const addProductCart = useCallback(() => {
    cart.addProduct(item);
  }, [cart, item]);

  return (
    <Card
      image={item.urlImage}
      captionSlot={<div className={style.card__caption}>{item.category}</div>}
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
          <div className={style.card__actions}>
            <Button onClick={addProductCart}>добавить</Button>
            <FavoriteToggle idProduct={item.id} />
          </div>
        ) : (
          <div className={style.card__actions}>
            <Text tag="span" view="p-16" color="primary">
              Нет в наличии
            </Text>
            <FavoriteToggle idProduct={item.id} />
          </div>
        )
      }
      onClick={openProductPage}
    />
  );
};

export default FavoriteCard;
