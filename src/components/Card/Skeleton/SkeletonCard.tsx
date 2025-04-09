import classNames from 'classnames';
import React from 'react';
import style from './SkeletonCard.module.scss';

const SkeletonCard: React.FC = () => {
  return (
    <div className={style[`card-skeleton`]}>
      <div className={classNames(style['card-skeleton__img'], style['card-skeleton__loading'])}></div>
      <div className={style['card-skeleton__wrapper']}>
        <div className={classNames(style['card-skeleton__caption'], style['card-skeleton__loading'])}></div>
        <div className={classNames(style['card-skeleton__title'], style['card-skeleton__loading'])}></div>
        <div className={classNames(style['card-skeleton__content'], style['card-skeleton__loading'])}></div>
        <div className={classNames(style['card-skeleton__content'], style['card-skeleton__loading'])}></div>
        <div className={classNames(style['card-skeleton__content'], style['card-skeleton__loading'])}></div>
        <div className={classNames(style['card-skeleton__action'], style['card-skeleton__loading'])}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
