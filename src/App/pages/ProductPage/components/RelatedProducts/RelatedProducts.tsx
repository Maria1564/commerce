import qs from "qs";
import React, { useEffect, useState } from "react";
import Text from "components/Text";
import { apiClient } from "config/axiosConfig";
import { Product } from "types/index";
import { normalizeData } from "utils/normalize";
import CardItem from "./CardItem";
import style from "./RelatedProducts.module.scss"

const RelatedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const params = {
      populate: ["images", "productCategory"],
      pagination: {
        pageSize: 3,
        page: Math.floor(Math.random() * 4) + 1,
      },
    };

    apiClient
      .get(`/products?${qs.stringify(params)}`)
      .then(({ data }) => setProducts(normalizeData(data.data)));
  }, []);

  return (
    <div>
      <Text view="title">Related Items</Text>
      <div className={style.list}>
        {products.map((item) => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
