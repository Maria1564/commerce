import { Routes } from "config/routes";

export type typeLink = {
  to: string;
  text: string;
};

export const links: typeLink[] = [
  {
    to: Routes.catalog,
    text: "Products",
  },
  {
    to: Routes.categories,
    text: "Categories",
  },
  {
    to: Routes.about,
    text: "About us",
  },
  {
    to: Routes.orders,
    text: "Orders"
  }
];
