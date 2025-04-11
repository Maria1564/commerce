import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { useCatalogPageContext } from 'store/CatalogPageStore/CatalogPageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { RequestParams } from 'types/typeParams';
import { Meta } from 'utils/meta';
import Dropdown from './Dropdown';
import Search from './Search';
import style from './Filter.module.scss';

const Filter: React.FC = () => {
  const rootStore = useRootStoreContext();
  const {categoriesStore} = useCatalogPageContext()

  useEffect(() => {
    const queryParams: RequestParams = {
      fields: ['id', 'title'],
    };

    categoriesStore.getCategories(queryParams);
  }, [categoriesStore, rootStore.queryParams.params]);

  useEffect(() => {
    if (categoriesStore.meta === Meta.success) {
      const newCategories = categoriesStore.categories.filter(
        (item) =>
          rootStore.queryParams.params.category &&
          rootStore.queryParams.params.category.split(',').includes(item.value),
      );
      categoriesStore.addSelectedCategories(newCategories);
    }
  }, [categoriesStore, categoriesStore.meta, rootStore.queryParams.params.category]);

  const handlerChange = useCallback(
    (value: Option[]) => {
      let strCategory = value.map((item) => item.value).join(',');
      categoriesStore.addSelectedCategories([...value]);

      rootStore.queryParams.updateParam('category', strCategory);
      rootStore.queryParams.updateParam('page', '1');
    },
    [categoriesStore, rootStore.queryParams],
  );

  const getTitle = useCallback((value: Option[]) => {
    const valuesStr = value.map((item) => item.value);
    return valuesStr.join(', ');
  }, []);

  return (
    <div className={style.filter}>
      <Search />
      <div className={style.filter__fields}>
        <MultiDropdown
          options={categoriesStore.categories}
          value={categoriesStore.selectedCategories}
          onChange={handlerChange}
          getTitle={getTitle}
          className={style.filter__dropdown}
        />
        <Dropdown />
      </div>
    </div>
  );
};

export default observer(Filter);
