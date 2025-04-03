import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { CategoryFilterStore } from 'store/CategoryFilterStore/CategoryFilterStore';
import rootStore from 'store/RootStore/instance';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';
import Dropdown from './Dropdown';
import Search from './Search';
import style from './Filter.module.scss';

const Filter: React.FC = () => {
  const [selectCategories, setSelectCategories] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const categoriesStore = useLocalStore(() => new CategoryFilterStore());

  useEffect(() => {
    const queryParams = {
      fields: ['id', 'title'],
    };

    categoriesStore.getCategories(queryParams);
  }, [rootStore.queryParams.params]);

  useEffect(() => {
    if (categoriesStore.meta === Meta.success) {
      setCategories(categoriesStore.categories as Option[]);

      const newCategories = categoriesStore.categories.filter(
        (item) =>
          rootStore.queryParams.params.category &&
          rootStore.queryParams.params.category.split(',').includes(item.value),
      );

      setSelectCategories(newCategories);
    }
  }, [categoriesStore.meta]);

  const handlerChange = useCallback((value: Option[]) => {
    let strCategory = value.map((item) => item.value).join(',');
    setSelectCategories([...value]);
    rootStore.queryParams.updateParam('category', strCategory);
    rootStore.queryParams.updateParam('page', '1');
  }, []);

  const getTitle = useCallback((value: Option[]) => {
    const valuesStr = value.map((item) => item.value);
    return valuesStr.join(', ');
  }, []);

  return (
    <div className={style.filter}>
      <Search />
      <div className={style.filter__fields}>
        <MultiDropdown
          options={categories}
          value={selectCategories}
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
