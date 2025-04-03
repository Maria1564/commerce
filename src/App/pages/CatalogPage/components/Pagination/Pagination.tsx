import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { PaginationStore } from 'store/PaginationStore/PaginationStore';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import PageItem from './PageItem';
import style from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const paginationStore = useLocalStore(() => new PaginationStore());
  const rootStore = useRootStoreContext();

  useEffect(() => {
    if (rootStore.queryParams.params.page) {
      const newParams = {
        pagination: {
          page: Number(rootStore.queryParams.params.page),
          pageSize: 9,
        },
        ...((rootStore.queryParams.params.search || rootStore.queryParams.params.category) && {
          filters: {
            ...(rootStore.queryParams.params.search && {
              title: {
                $containsi: rootStore.queryParams.params.search,
              },
            }),

            ...(rootStore.queryParams.params.category && {
              productCategory: {
                title: {
                  $containsi: rootStore.queryParams.params.category.split(','),
                },
              },
            }),
          },
        }),
      };

      paginationStore.getInfoPage(newParams);
    }
  }, [
    rootStore.queryParams.params.search,
    rootStore.queryParams.params.category,
    rootStore.queryParams.params.page,
    paginationStore,
  ]);

  const handleNextPage = useCallback(() => {
    paginationStore.goToNextPage();
    rootStore.queryParams.updateParam('page', String(paginationStore.currentPage));
  }, [paginationStore]);

  const handlePrevPage = useCallback(() => {
    paginationStore.goToPrevPage();
    rootStore.queryParams.updateParam('page', String(paginationStore.currentPage));
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
