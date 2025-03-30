import React from "react";
import { Link } from "react-router";
import Text from "components/Text";

import { Routes } from "config/routes";
import style from "./NotFoundPage.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Text view="title" className={style.bold_text}>
        404
      </Text>
      <Text view="p-20" weight="medium" className={style.text}>
        К сожалению страница не найдена(
      </Text>
      <Link to={Routes.catalog}>Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
