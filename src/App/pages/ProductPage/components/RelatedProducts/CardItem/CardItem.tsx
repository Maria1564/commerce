import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { ProductModel } from 'store/models/product/product';

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
      captionSlot={item.category}
      title={item.title}
      subtitle={item.description}
      contentSlot={`$${item.price}`}
      actionSlot={<Button onClick={addProductCart}>Add to Cart</Button>}
      onClick={onClick}
    />
  );
};

export default CardItem;
