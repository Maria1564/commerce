import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Text } from 'components/Text';
import style from './Rating.module.scss';

type RatingProps = {
  rating: number;
};

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className={style.rating}>
      <FaStar className={style.rating__icon} />
      <Text tag="span" color="primary" view="p-16">
        {rating}
      </Text>
    </div>
  );
};

export default Rating;
