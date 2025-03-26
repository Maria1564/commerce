import classNames from "classnames";
import qs from "qs";
import React, { useEffect, useState } from "react";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { apiClient } from "config/axiosConfig";
import { createPagination } from "./utils";
import style from "./Pagination.module.scss";

const Pagination: React.FC = () => {
  const [currPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(4);
  const [pages, setPages] = useState<(string | number)[]>([]);

  useEffect(() => {
    setPages(createPagination(totalPage, currPage));
  }, [totalPage, currPage]);

  useEffect(() => {
    const params = {
      pagination: {
        page: currPage,
        pageSize: 9,
      },
    };

    let queryParams = qs.stringify(params);
    apiClient
      .get(`/products?${queryParams}`)
      .then(({ data }) => {
        setTotalPage(data.meta.pagination.pageCount)
      });
  }, [currPage]);


  return (
    <div className={style.wrapper}>
      <ArrowRightIcon className={classNames(style.arrow_left, {
        [style.arrow_disabled]: currPage === 1
      })}/>
      <div className={style.pages}>
        {pages.map((page) =>
          typeof page === "number" ? (
            <div
              className={`${style.page} ${page === currPage && style.page__active}`}
            >
              {page}
            </div>
          ) : (
            <span>{page}</span>
          )
        )}
      </div>
      <ArrowRightIcon className={classNames(style.arrow, {
        [style.arrow_disabled]: currPage === totalPage
      })}/>
    </div>
  );
};

export default Pagination;
