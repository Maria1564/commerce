import React from "react";
import { benefits } from "./data";
import style from "./KeyBenefits.module.scss";

const KeyBenefits: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <ul>
        {benefits.map(
          (item, index) =>
            index < 2 && <li className={style.list_item}>{item}</li>
        )}
      </ul>
      <ul>
        {benefits.map(
          (item, index) =>
            index >= 2 && <li className={style.list_item}>{item}</li>
        )}
      </ul>
    </div>
  );
};

export default KeyBenefits;
