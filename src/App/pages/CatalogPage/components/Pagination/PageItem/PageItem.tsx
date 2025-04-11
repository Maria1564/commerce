import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { PaginationStore } from 'store/CatalogPageStore/PaginationStore/PaginationStore';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import style from './PageItem.module.scss';

type PageItemProps = {
  page: number;
  currPage: number;
};

const PageItem: React.FC<PageItemProps> = ({ page, currPage }) => {
  const paginationStore = useLocalStore(() => new PaginationStore());
  const rootStore = useRootStoreContext();

  const togglePage = useCallback(() => {
    paginationStore.togglePage(page);
    rootStore.queryParams.updateParam('page', String(page));
  }, [page, paginationStore]);

  return (
    <div key={page} className={classNames(style.page, page === currPage && style.page_active)} onClick={togglePage}>
      {page}
    </div>
  );
};

export default observer(PageItem);
