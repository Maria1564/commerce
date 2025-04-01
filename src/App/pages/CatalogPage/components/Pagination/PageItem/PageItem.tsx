import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useQueryContext } from 'app/provider/QueryContext';
import style from './PageItem.module.scss';

type PageItemProps = {
  page: number;
  currPage: number;
  setCurrPage: (newState: number) => void;
};

const PageItem: React.FC<PageItemProps> = ({ page, currPage, setCurrPage }) => {
  const queryContext = useQueryContext();

  if (!queryContext) {
    return;
  }

  const { updaterQueryParams } = queryContext;

  const togglePage = useCallback(() => {
    setCurrPage(page);
    updaterQueryParams({ page: String(page) });
  }, [page]);
  return (
    <div key={page} className={classNames(style.page, page === currPage && style.page_active)} onClick={togglePage}>
      {page}
    </div>
  );
};

export default PageItem;
