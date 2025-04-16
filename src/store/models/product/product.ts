export type ProductModel = {
  id: string;
  category?: string;
  title: string;
  description: string;
  urlImage: string;
  price: number;
  isInStock: boolean;
  rating: number;
};

export type ProductApi = {
  documentId: string;
  title: string;
  description: string;
  price: number;
  images: { url: string }[];
  productCategory: { title: string };
  isInStock: boolean;
  rating: number;
};

export const normalizeProductApi = (data: ProductApi): ProductModel => {
  return {
    id: data.documentId,
    title: data.title,
    description: data.description,
    urlImage: data.images[0].url,
    ...(data.productCategory && { category: data.productCategory.title }),
    price: data.price,
    isInStock: data.isInStock,
    rating: data.rating,
  };
};
