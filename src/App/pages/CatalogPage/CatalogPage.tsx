import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQueryContext } from "app/provider/QueryContext";
import Text from "components/Text";
import Filter from "./components/Filter";
import ListProducts from "./components/ListProducts";
import Pagination from "./components/Pagination";
import style from "./CatalogPage.module.scss";

const CatalogPage: React.FC = () => {
  const queryContext = useQueryContext();

  if (!queryContext) {
    return
  }

  // const { params } = queryContext;
  const navigate = useNavigate();

  //присвоение query-параметров при переходе на страницу каталог
  useEffect(() => {
    // updateQueryParams(navigate, params)
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.about}>
        <Text view="title" weight="bold">
          Products
        </Text>
        <Text view="p-20" color="secondary" className={style.text}>
          {" "}
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
      </div>
      <Filter />
      <ListProducts />
      <Pagination />
    </div>
  );
};

export default CatalogPage;
