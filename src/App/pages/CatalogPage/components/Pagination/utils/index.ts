export const createPagination = (totalPages: number, currentPage: number) => {
  const pages: number[] = [];

  if (totalPages === 0) {
    return [];
  }
  if (totalPages === 1) {
    return [1];
  }

  if (totalPages === 2) {
    return [1, 2];
  }

  if (currentPage === 1) {
    pages.push(1, 2, 3);
  } else if (currentPage === totalPages) {
    pages.push(currentPage - 2, currentPage - 1, currentPage);
  } else {
    pages.push(currentPage - 1, currentPage, currentPage + 1);
  }

  return pages;
};
