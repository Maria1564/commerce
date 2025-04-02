import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import rootStore from 'store/RootStore/instance';
import style from './PageItem.module.scss';

type PageItemProps = {
  page: number;
  currPage: number;
  setCurrPage: (newState: number) => void;
};

const PageItem: React.FC<PageItemProps> = ({ page, currPage, setCurrPage }) => {
  const togglePage = useCallback(() => {
    setCurrPage(page);
    rootStore.queryParams.updateParam('page', String(page));
  }, [page, setCurrPage]);
  return (
    <div key={page} className={classNames(style.page, page === currPage && style.page_active)} onClick={togglePage}>
      {page}
    </div>
  );
};

export default observer(PageItem);
