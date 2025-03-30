import { Product } from "types/index";

export type ProductApi = {
    documentId: number;
    title: string;
    description: string;
    price: number;
    images: {url: string}[],
    productCategory: {title: string}
}


export const normalizeProductApi = (data: ProductApi): Product => {
    return {id: data.documentId,
        title: data.title,
        description: data.description,
        urlImage: data.images[0].url,
        category: data.productCategory.title,
        price: data.price}
}