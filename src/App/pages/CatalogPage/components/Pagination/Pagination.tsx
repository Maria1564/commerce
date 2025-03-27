import classNames from "classnames";
import qs from "qs";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useQueryContext } from "App/provider/QueryContext";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { apiClient } from "config/axiosConfig";
import { createPagination } from "./utils";
import style from "./Pagination.module.scss";

const Pagination: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [totalPage, setTotalPage] = useState<number>(4);
  const [pages, setPages] = useState<(string | number)[]>([]);
  
 const queryContext = useQueryContext();
 
   if (!queryContext) {
     return
   }
 
   const { params, changeParamByKey} = queryContext;
 
  const [currPage, setCurrPage] = useState<number>(Number(searchParams.get("page")) || Number(params.page));

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

  const handleNextPage = useCallback(() => {
    setCurrPage(currPage+1)
    changeParamByKey("page", String(currPage+1))
  },[setCurrPage, currPage])

  const handlePrevPage = useCallback(() =>{
    setCurrPage(currPage-1)
    changeParamByKey("page", String(currPage-1))
  }, [setCurrPage, currPage])

  const togglePage = (page: number) => {
    setCurrPage(page)
    changeParamByKey("page", String(page))
  }

  return (
    <div className={style.wrapper}>
      <ArrowRightIcon className={classNames(style.arrow_left, {
        [style.arrow_disabled]: currPage === 1
      })} onClick={ currPage === 1 ? ()=>{} : handlePrevPage}/>
      <div className={style.pages}>
        {pages.map((page) =>
          typeof page === "number" ? (
            <div key={page}
              className={`${style.page} ${page === currPage && style.page__active}`}
              onClick={() => togglePage(page)}
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
      })}
      onClick={currPage === totalPage ? () => {} : handleNextPage}/>
    </div>
  );
};

export default Pagination;
