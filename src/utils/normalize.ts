import { Product } from "types/index";

export type TypeApiResponse = {
    documentId: number;
    title: string;
    description: string;
    price: number;
    images: {url: string}[],
    productCategory: {title: string}
}


export const normalizeData = (data: TypeApiResponse[]): Product[] => {
    return data.map(item => ({id: item.documentId,
        title: item.title,
        description: item.description,
        urlImage: item.images[0].url,
        category: item.productCategory.title,
        price: item.price}))
}