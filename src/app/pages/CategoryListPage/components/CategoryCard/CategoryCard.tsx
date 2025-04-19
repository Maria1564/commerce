import React from 'react';
import { IconType } from 'react-icons';
import { Text } from 'components/Text';
import style from './CategoryCard.module.scss';

type CategoryCardProps = {
  nameCategory: string;
  IconComponent: IconType;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ nameCategory, IconComponent }) => {
  return (
    <div className={style.category}>
      <IconComponent className={style.category__icon} />
      <Text view="p-20" weight="medium" color="accent" className={style.category__text}>
        {nameCategory}
      </Text>
    </div>
  );
};

export default CategoryCard;
