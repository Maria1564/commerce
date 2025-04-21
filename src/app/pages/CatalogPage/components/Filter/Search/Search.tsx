import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { useCatalogPageContext } from 'store/CatalogPageStore/CatalogPageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import style from './Search.module.scss';

const Search: React.FC = () => {
  const { searchStore } = useCatalogPageContext();
  const { queryParams } = useRootStoreContext();

  useEffect(() => {
    if (queryParams.params.search) {
      searchStore.setValue(queryParams.params.search);
    }
  }, [queryParams.params.search, searchStore]);

  const handlerChangeValue = useCallback(
    (value: string) => {
      searchStore.setValue(value);
    },
    [searchStore],
  );

  const findProducts = useCallback(() => {}, []);

  return (
    <div className={style.search}>
      <Input
        placeholder="Search product"
        value={searchStore.valueSearch}
        onChange={handlerChangeValue}
        className={style.search__input}
      />
      <Button onClick={findProducts}>поиск</Button>
    </div>
  );
};

export default observer(Search);
