export const createPagination = (totalPages: number, currentPage: number) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    return pages;
  }

  const lastPage = totalPages;
  if (currentPage < 4) {
    if (currentPage < 3) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
    } else if (currentPage < 4) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
    }
    pages.push("...", lastPage);
  } else if (currentPage > totalPages - 3) {
    pages.push(1, "...");
    if (currentPage > totalPages - 2) {
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    }
  } else {
    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );
  }

  return pages;
};
