import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';
import { ProductModel } from 'store/model/product/product';

type CardItemProps = {
  item: ProductModel;
};

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/product/${item.id}`);
  }, []);

  return (
    <Card
      image={item.urlImage}
      captionSlot={item.category}
      title={item.title}
      subtitle={item.description}
      contentSlot={`$${item.price}`}
      actionSlot={<Button>Add to Cart</Button>}
      onClick={onClick}
    />
  );
};

export default React.memo(CardItem);
