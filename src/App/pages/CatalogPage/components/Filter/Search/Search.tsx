import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import { useCatalogPageContext } from 'store/CatalogPageStore/CatalogPageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import style from './Search.module.scss';

const Search: React.FC = () => {
  const rootStore = useRootStoreContext();
  const { searchStore } = useCatalogPageContext();

  const handlerChangeValue = useCallback(
    (value: string) => {
      searchStore.setValue(value);
    },
    [searchStore],
  );

  const findProducts = useCallback(() => {
    rootStore.queryParams.updateParam('search', searchStore.valueSearch.trim());

    if (searchStore.valueSearch.trim() !== '') {
      rootStore.queryParams.updateParam('page', '1');
    }
    searchStore.clear();
  }, [rootStore.queryParams, searchStore]);

  return (
    <div className={style.search}>
      <Input
        placeholder="Search product"
        value={searchStore.valueSearch}
        onChange={handlerChangeValue}
        className={style.search__input}
      />
      <Button onClick={findProducts}>Find now</Button>
    </div>
  );
};

export default observer(Search);
