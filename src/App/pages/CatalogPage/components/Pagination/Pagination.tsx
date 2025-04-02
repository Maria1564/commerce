import { observer } from 'mobx-react-lite';
import qs from 'qs';
import React, { useCallback, useEffect, useState } from 'react';
import { useQueryContext } from 'app/provider/QueryContext';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import rootStore from 'store/RootStore/instance';
import { apiClient } from 'utils/axiosConfig';
import PageItem from './PageItem';
import { createPagination } from './utils';
import style from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const [totalPage, setTotalPage] = useState<number>(4);
  const [pages, setPages] = useState<number[]>([]);

  const queryContext = useQueryContext();

  if (!queryContext) {
    return;
  }

  const [currPage, setCurrPage] = useState<number | null>(null);
  useEffect(() => {
    if (currPage) {
      setPages(createPagination(totalPage, currPage));
    }
  }, [totalPage, currPage]);

  useEffect(() => {
    if (rootStore.queryParams.params.page) {
      const newParams = {
        pagination: {
          page: rootStore.queryParams.params.page,
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
      let queryParams = qs.stringify(newParams);
      apiClient.get(`/products?${queryParams}`).then(({ data }) => {
        setCurrPage(data.meta.pagination.page);
        setTotalPage(data.meta.pagination.pageCount);
      });
    }
  }, [rootStore.queryParams.params.search, rootStore.queryParams.params.category, rootStore.queryParams.params.page]);

  const handleNextPage = useCallback(() => {
    if (currPage) {
      setCurrPage(currPage + 1);
      rootStore.queryParams.updateParam('page', String(currPage + 1));
    }
  }, [currPage]);

  const handlePrevPage = useCallback(() => {
    if (currPage) {
      setCurrPage(currPage - 1);
      rootStore.queryParams.updateParam('page', String(currPage - 1));
    }
  }, [currPage]);
  return (
    <div className={style.pagination}>
      {currPage && currPage !== 1 && (
        <ArrowRightIcon
          className={style[`pagination__arrow-left`]}
          onClick={currPage === 1 ? () => {} : handlePrevPage}
        />
      )}
      <div className={style.pagination__pages}>
        {pages.map((page) => (
          <PageItem key={page} currPage={currPage!} page={page} setCurrPage={setCurrPage} />
        ))}
      </div>
      {currPage && currPage !== totalPage && totalPage ? (
        <ArrowRightIcon onClick={currPage === totalPage ? () => {} : handleNextPage} />
      ) : null}
    </div>
  );
};

export default observer(Pagination);
