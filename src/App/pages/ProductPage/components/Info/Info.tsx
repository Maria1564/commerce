import qs from "qs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "components/Button";
import Text from "components/Text";
import { apiClient } from "utils/axiosConfig";
import { Product } from "types/index";
import { normalizeData } from "./utils/normalize";
import style from "./Info.module.scss";

const Info: React.FC = () => {
  const [infoProduct, setInfoProduct] = useState<Omit<
    Product,
    "category"
  > | null>(null);
  const { id } = useParams();

  //получение данных о выбранном товаре
  useEffect(() => {
    const params = {
      populate: "images",
    };

    apiClient
      .get(`/products/${id}?${qs.stringify(params)}`)
      .then(({ data }) => setInfoProduct(normalizeData(data.data)));
  }, [id]);

  return (
    <div className={style.info}>
      <img src={infoProduct?.urlImage} className={style.image} />

      <div className={style.about}>
        <Text view="title">{infoProduct?.title}</Text>
        <Text view="p-20" color="secondary" className={style.description}>
          {infoProduct?.description}
        </Text>
        <Text view="title">${infoProduct?.price}</Text>
        <div className={style.actions}>
          <Button>Buy now</Button>
          <Button className={style.btn_outline}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
