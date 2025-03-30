import qs from "qs";
import React, { useEffect, useState } from "react";
import { normalizeData } from "utils/normalize";
import { useQueryContext } from "app/provider/QueryContext";
import Text from "components/Text";
import { apiClient } from "config/axiosConfig";
import { Product } from "types/index";
import CardItem from "./CardItem";
import style from "./ListProducts.module.scss";

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const queryContext = useQueryContext();

  if (!queryContext) {
    return;
  }

  const { params: queryParams } = queryContext;


  //получение общего количества товаров
  useEffect(() => {
    apiClient
      .get("/products")
      .then(({ data }) => setTotalProducts(data.meta.pagination.total));
  }, []);

  //получение списка товаров
  useEffect(() => {
    const params = {
      populate: ["images", "productCategory"],
      pagination: {
        pageSize: 9,
        page: queryParams.page
      },
      ...((queryParams.search || queryParams.category) && 
        {
          filters: {
            ...(queryParams.search && {
              title: {
                $containsi: queryParams.search
              }
            }),

            ...(queryParams.category && {
              productCategory: {
                title: {
                  $containsi: queryParams.category.split(",")
                }
              }
            })
          }
        }
      ),
      ...(queryParams.sort && {sort: queryParams.sort})
    };
    
    apiClient.get(`/products?${qs.stringify(params)}`).then(({ data }) => {
      setProducts(normalizeData(data.data));
      setTotalProducts(data.meta.pagination.total)
    });
  }, [queryParams]);

  return (
    <div className={style.wrapper}>
      <div className={style.text}>
        <Text className={style.subtitle}>Total products</Text>
        <Text view="p-20" tag="span" color="accent" weight="bold">
          {totalProducts}
        </Text>
      </div>
      <div className={style.list}>
        {products.map((item) => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
