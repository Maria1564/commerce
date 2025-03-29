export type Option = {
  value: string;
  text: string;
};

export const dataOptions: Option[] = [
  {
    value: "",
    text: "по популярности",
  },
  {
    value: "price",
    text: "сначала недорогие",
  },
  {
    value: "price:desc",
    text: "сначала дорогие",
  },
];
