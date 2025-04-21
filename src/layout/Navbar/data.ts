import { Routes } from "config/routes";

export type typeLink = {
  to: string;
  text: string;
};

export const links: typeLink[] = [
  {
    to: Routes.catalog,
    text: "Каталог",
  },
  {
    to: Routes.categories,
    text: "Категории",
  },
  {
    to: Routes.about,
    text: "О нас",
  },
  {
    to: Routes.orders,
    text: "Заказы"
  }
];
