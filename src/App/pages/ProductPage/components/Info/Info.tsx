import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Button from 'components/Button';
import Text from 'components/Text';
import { normalizeProductApi, ProductModel } from 'store/model/product/product';
import { apiClient } from 'utils/axiosConfig';
import style from './Info.module.scss';

const Info: React.FC = () => {
  const [infoProduct, setInfoProduct] = useState<Omit<ProductModel, 'category'> | null>(null);
  const { id } = useParams();

  //получение данных о выбранном товаре
  useEffect(() => {
    const params = {
      populate: 'images',
    };

    apiClient.get(`/products/${id}?${qs.stringify(params)}`).then(({ data }) => {
      setInfoProduct(normalizeProductApi(data.data));
    });
  }, [id]);

  return (
    <div className={style.info}>
      <img src={infoProduct?.urlImage} className={style.info__image} />

      <div className={style.info__wrapper}>
        <Text view="title">{infoProduct?.title}</Text>
        <Text view="p-20" color="secondary" className={style.info__description}>
          {infoProduct?.description}
        </Text>
        <Text view="title">${infoProduct?.price}</Text>
        <div className={style.info__actions}>
          <Button>Buy now</Button>
          <Button className={style.info__btn_outline}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
