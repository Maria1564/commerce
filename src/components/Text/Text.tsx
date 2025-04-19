import classNames from 'classnames';
import * as React from 'react';
import style from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view = 'p-14', tag: Tag = 'p', weight, children, color, maxLines }) => {
  return (
    <Tag
      className={classNames(
        style.text,
        className,
        view && style[`text_${view}`],
        weight && style[`text_${weight}`],
        color && style[`text__color_${color}`],
      )}
      style={{ WebkitLineClamp: maxLines ? maxLines : 100 }}
    >
      {children}
    </Tag>
  );
};

export default React.memo(Text);
