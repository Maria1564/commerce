import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { ArrowRightIcon } from 'components/icons/ArrowRightIcon';
import { useCatalogPageContext } from 'store/CatalogPageStore/CatalogPageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { PageItem } from './PageItem';
import style from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const { paginationStore } = useCatalogPageContext();
  const rootStore = useRootStoreContext();

  useEffect(() => {
    if (rootStore.queryParams.params.page) {
      paginationStore.getInfoPage(rootStore.queryParams.params);
    }
  }, [paginationStore, rootStore.queryParams.params]);

  const handleNextPage = useCallback(() => {
    paginationStore.goToNextPage();
  }, [paginationStore]);

  const handlePrevPage = useCallback(() => {
    paginationStore.goToPrevPage();
  }, [paginationStore]);

  return (
    <div className={style.pagination}>
      {paginationStore.currentPage && paginationStore.currentPage !== 1 && (
        <ArrowRightIcon
          className={style[`pagination__arrow-left`]}
          onClick={paginationStore.currentPage === 1 ? () => {} : handlePrevPage}
        />
      )}
      <div className={style.pagination__pages}>
        {paginationStore.pages.map((page) => (
          <PageItem key={page} currPage={paginationStore.currentPage} page={page} />
        ))}
      </div>
      {paginationStore.currentPage &&
      paginationStore.currentPage !== paginationStore.totalPages &&
      paginationStore.totalPages ? (
        <ArrowRightIcon
          onClick={paginationStore.currentPage === paginationStore.totalPages ? () => {} : handleNextPage}
        />
      ) : null}
    </div>
  );
};

export default observer(Pagination);
