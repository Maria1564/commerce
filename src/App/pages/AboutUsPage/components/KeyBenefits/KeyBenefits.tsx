import React from 'react';
import { firstList, secondList } from './data';
import style from './KeyBenefits.module.scss';

const KeyBenefits: React.FC = () => {
  return (
    <div className={style.benefits}>
      <ul>
        {firstList.map((item, index) => (
          <li key={index} className={style.benefits__item}>
            {item}
          </li>
        ))}
      </ul>
      <ul>
        {secondList.map((item, index) => (
          <li key={index} className={style.benefits__item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyBenefits;
