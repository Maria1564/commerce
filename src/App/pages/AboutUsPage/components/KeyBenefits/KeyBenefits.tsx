import React from "react";
import { benefits } from "./data";
import style from "./KeyBenefits.module.scss";

const KeyBenefits: React.FC = () => {
  return (
    <div className={style.benefits}>
      <ul>
        {benefits.map(
          (item, index) =>
            index < 2 && <li key={index} className={style.benefits__item}>{item}</li>
        )}
      </ul>
      <ul>
        {benefits.map(
          (item, index) =>
            index >= 2 && <li key={index} className={style.benefits__item}>{item}</li>
        )}
      </ul>
    </div>
  );
};

export default KeyBenefits;
