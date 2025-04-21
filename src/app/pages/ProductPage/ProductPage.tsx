import React from 'react';
import { Link } from 'react-router';
import { Text } from 'components/Text';
import { ArrowLeftIcon } from 'components/icons/ArrowLeftIcon';
import { Routes } from 'config/routes';
import { Info } from './components/Info';
import { RelatedProducts } from './components/RelatedProducts';
import style from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  return (
    <div className={style.product}>
      <Link to={Routes.catalog} replace className={style[`product__link-back`]}>
        <ArrowLeftIcon className={style.product__icon} />
        <Text view="p-20" color="primary">
          назад
        </Text>
      </Link>
      <Info />
      <RelatedProducts />
    </div>
  );
};

export default ProductPage;
