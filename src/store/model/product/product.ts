export type ProductModel = {
  id: number;
  category?: string;
  title: string;
  description: string;
  urlImage: string;
  price: number;
};

export type ProductApi = {
  documentId: number;
  title: string;
  description: string;
  price: number;
  images: { url: string }[];
  productCategory: { title: string };
};

export const normalizeProductApi = (data: ProductApi): ProductModel => {
  return {
    id: data.documentId,
    title: data.title,
    description: data.description,
    urlImage: data.images[0].url,
    ...(data.productCategory && { category: data.productCategory.title }),
    price: data.price,
  };
};
