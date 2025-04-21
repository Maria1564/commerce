export type CategoryModel = {
  id: string;
  title: string;
};

export type CategoryApi = {
  documentId: string;
  title: string;
};

export const normalizeCategoryApi = (from: CategoryApi): CategoryModel => {
  return {
    id: from.documentId,
    title: from.title,
  };
};
