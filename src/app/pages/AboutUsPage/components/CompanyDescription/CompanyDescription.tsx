import React from 'react';
import { Text } from 'components/Text';
import bgImage from '../../assets/bg.jpg';
import style from './CompanyDescription.module.scss';

const CompanyDescription: React.FC = () => {
  return (
    <div className={style.info}>
      <div>
        <Text view="p-20" tag="p" color="primary" className={style.info__text}>
          <Text tag="span" color="accent" weight="medium" view="p-20" className={style[`info__name-company`]}>
            Lalasia
          </Text>
          — это не просто площадка с товарами, а надежный партнер, который заботится о вашем комфорте. Мы тщательно
          отбираем ассортимент, работаем только с проверенными поставщиками и постоянно совершенствуем сервис, чтобы вы
          получали лучшее сочетание качества, цены и сервиса.
        </Text>
        <Text view="p-20" tag="p" color="primary" className={style.info__text}>
          Мы стремимся изменить представление об онлайн-шопинге, превратив каждую покупку в приятное и вдохновляющее
          событие.
        </Text>
        <Text view="p-20" tag="p" color="primary" className={style.info__text}>
          За нашим магазином стоит команда увлеченных профессионалов — от маркетологов и закупщиков до IT-специалистов и
          службы поддержки. Мы постоянно учимся, внедряем новые технологии и прислушиваемся к вашим отзывам, чтобы
          становиться лучше каждый день. Наш главный приоритет — ваше удовлетворение от покупок и желание возвращаться к
          нам снова и снова.
        </Text>
      </div>
      <img src={bgImage} alt="bg" width={420} height={420} />
    </div>
  );
};

export default CompanyDescription;
