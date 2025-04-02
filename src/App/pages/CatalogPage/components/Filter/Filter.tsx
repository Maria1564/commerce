import { observer } from 'mobx-react-lite';
import qs from 'qs';
import React, { useCallback, useEffect, useState } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import rootStore from 'store/RootStore/instance';
import { apiClient } from 'utils/axiosConfig';
import Dropdown from './Dropdown';
import Search from './Search';
import style from './Filter.module.scss';

const Filter: React.FC = () => {
  const [selectCategories, setSelectCategories] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);

  useEffect(() => {
    const queryParams = {
      fields: ['id', 'title'],
    };

    apiClient.get(`/product-categories?${qs.stringify(queryParams)}`).then(({ data }) => {
      setCategories(
        data.data.map((item: { id: number; title: string }) => ({
          key: item.id,
          value: item.title,
        })),
      );

      const newCategories = data.data.filter(
        (item: { title: string }) =>
          rootStore.queryParams.params.category &&
          rootStore.queryParams.params.category.split(',').includes(item.title),
      );
      setSelectCategories(
        newCategories.map((item: { id: number; title: string }) => ({
          key: item.id,
          value: item.title,
        })),
      );
    });
  }, [rootStore.queryParams.params]);

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
