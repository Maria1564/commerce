import React from "react";
import { Link } from "react-router";
import Text from "components/Text";

import { Routes } from "config/routes";
import style from "./NotFoundPage.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <div className={style[`not-found`]}>
      <Text view="title" className={style[`not-found__text_bold`]}>
        404
      </Text>
      <Text view="p-20" weight="medium" className={style[`not-found__text`]}>
        К сожалению страница не найдена(
      </Text>
      <Link to={Routes.catalog} className={style[`not-found__link`]}>Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
