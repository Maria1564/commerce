import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useCatalogPageContext } from 'store/CatalogPageStore/CatalogPageProvider';
import style from './PageItem.module.scss';

type PageItemProps = {
  page: number;
  currPage: number;
};

const PageItem: React.FC<PageItemProps> = ({ page, currPage }) => {
  const { paginationStore } = useCatalogPageContext();

  const togglePage = useCallback(() => {
    paginationStore.togglePage(page);
  }, [page, paginationStore]);

  return (
    <div key={page} className={classNames(style.page, page === currPage && style.page_active)} onClick={togglePage}>
      {page}
    </div>
  );
};

export default observer(PageItem);
