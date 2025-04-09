import classNames from 'classnames';
import React from 'react';
import Text from 'components/Text';
import style from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={classNames(style.card, className)}>
      <img src={image} alt="" className={style.card__image} width={360} />

      <div className={style.card__content}>
        <div className={style.card__about} onClick={onClick}>
          {captionSlot && (
            <Text tag="div" className={style['card__capt-slot']} view="p-14" weight="medium" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text view="p-20" weight="medium" maxLines={2} color="primary" className={style.card__title}>
            {title}
          </Text>
          <Text className={style.card__subtitle} view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={style['card__other-info']}>
            {contentSlot && (
              <Text tag="span" view="p-18" weight="bold" className={style['card__content-slot']}>
                {contentSlot}
              </Text>
            )}
            {actionSlot && actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
