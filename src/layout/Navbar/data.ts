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
    to: Routes.main,
    text: "Categories",
  },
  {
    to: Routes.about,
    text: "About us",
  },
];
