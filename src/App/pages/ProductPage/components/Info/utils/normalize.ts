import { Product } from "types/index";
import { TypeApiResponse } from "utils/normalize";

export const normalizeData = (data: TypeApiResponse): Omit<Product, "category"> => {
  return {
    id: data.documentId,
    title: data.title,
    description: data.description,
    urlImage: data.images[0].url,
    price: data.price,
  };
};
