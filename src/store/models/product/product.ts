export type ProductModel = {
  id: string;
  category?: string;
  title: string;
  description: string;
  urlImage: string;
  price: number;
  isInStock: boolean;
  rating: number;
  discountedPrice: number;
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
  discountPercent: number;
};

const calculateFinalPrice = (price: number, percent: number): number => {
  if (percent > 0) {
    return +(price * (1 - percent / 100)).toFixed(0);
  }

  return 0;
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
    discountedPrice: calculateFinalPrice(data.price, data.discountPercent),
  };
};
