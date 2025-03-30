import classNames from "classnames";
import qs from "qs";
import React, { useCallback, useEffect, useState } from "react";
import { useQueryContext } from "app/provider/QueryContext";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { apiClient } from "utils/axiosConfig";
import { createPagination } from "./utils";
import style from "./Pagination.module.scss";

const Pagination: React.FC = () => {
  const [totalPage, setTotalPage] = useState<number>(4);
  const [pages, setPages] = useState<(string | number)[]>([]);

  const queryContext = useQueryContext();

  if (!queryContext) {
    return;
  }

  const { params, changeParamByKey } = queryContext;
  const [currPage, setCurrPage] = useState<number>(Number(params.page));

  useEffect(() => {
    setPages(createPagination(totalPage, currPage));
  }, [totalPage, currPage]);

  useEffect(() => {
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
                $containsi: params.category.split(","),
              },
            },
          }),
        },
      }),
    };
    let queryParams = qs.stringify(newParams);

    apiClient.get(`/products?${queryParams}`).then(({ data }) => {
      setCurrPage(Number(params.page));
      setTotalPage(data.meta.pagination.pageCount);
    });
  }, [currPage, params.search, params.category]);

  const handleNextPage = useCallback(() => {
    setCurrPage(currPage + 1);
    changeParamByKey("page", String(currPage + 1));
  }, [setCurrPage, currPage]);

  const handlePrevPage = useCallback(() => {
    setCurrPage(currPage - 1);
    changeParamByKey("page", String(currPage - 1));
  }, [setCurrPage, currPage]);

  const togglePage = (page: number) => {
    setCurrPage(page);
    changeParamByKey("page", String(page));
  };

  return (
    <div className={style.wrapper}>
      <ArrowRightIcon
        className={classNames(style.arrow_left, {
          [style.arrow_disabled]: currPage === 1,
        })}
        onClick={currPage === 1 ? () => {} : handlePrevPage}
      />
      <div className={style.pages}>
        {pages.map((page) =>
          typeof page === "number" ? (
            <div
              key={page}
              className={`${style.page} ${page === currPage && style.page__active}`}
              onClick={() => togglePage(page)}
            >
              {page}
            </div>
          ) : (
            <span>{page}</span>
          ),
        )}
      </div>
      <ArrowRightIcon
        className={classNames(style.arrow, {
          [style.arrow_disabled]: currPage === totalPage,
        })}
        onClick={currPage === totalPage ? () => {} : handleNextPage}
      />
    </div>
  );
};

export default Pagination;
