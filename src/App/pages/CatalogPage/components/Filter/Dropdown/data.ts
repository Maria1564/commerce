export type Option = {
  value: string;
  text: string;
};

export const dataOptions: Option[] = [
  {
    value: '',
    text: 'по популярности',
  },
  {
    value: 'price',
    text: 'сначала дешёвые',
  },
  {
    value: 'price:desc',
    text: 'сначала дорогие',
  },
  {
    value: 'publishedAt',
    text: 'сначала старые',
  },
  {
    value: 'publishedAt:desc',
    text: 'сначала новые',
  },
];
