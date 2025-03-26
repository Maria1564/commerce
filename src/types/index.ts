/* eslint-disable no-unused-vars */
export enum Routes {
    main = "/",
    catalog ="/catalog",
    productById = "/product/:id"
}

export type Product = {
    id: number;
    category: string;
    title: string;
    description: string;
    urlImage: string;
    price: number;
}