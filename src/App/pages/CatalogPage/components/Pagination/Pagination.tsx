import qs from 'qs';
import React, { useCallback, useEffect, useState } from 'react';
import { useQueryContext } from 'app/provider/QueryContext';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
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

  const { values: params, updaterQueryParams } = queryContext;
  const [currPage, setCurrPage] = useState<number | null>(null);
  useEffect(() => {
    if (currPage) {
      setPages(createPagination(totalPage, currPage));
    }
  }, [totalPage, currPage]);

  useEffect(() => {
    if (params.page) {
      const newParams = {
        pagination: {
          page: params.page,
          pageSize: 9,
        },
        ...((params.search || params.category) && {
          filters: {
            ...(params.search && {
              title: {
                $containsi: params.search,
              },
            }),

            ...(params.category && {
              productCategory: {
                title: {
                  $containsi: params.category.split(','),
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
  }, [params.search, params.category, params.page]);

  const handleNextPage = useCallback(() => {
    if (currPage) {
      setCurrPage(currPage + 1);
      updaterQueryParams({ page: String(currPage + 1) });
    }
  }, [currPage]);

  const handlePrevPage = useCallback(() => {
    if (currPage) {
      setCurrPage(currPage - 1);
      updaterQueryParams({ page: String(currPage - 1) });
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
          <PageItem currPage={currPage!} page={page} setCurrPage={setCurrPage} />
        ))}
      </div>
      {currPage && currPage !== totalPage && (
        <ArrowRightIcon onClick={currPage === totalPage ? () => {} : handleNextPage} />
      )}
    </div>
  );
};

export default Pagination;
