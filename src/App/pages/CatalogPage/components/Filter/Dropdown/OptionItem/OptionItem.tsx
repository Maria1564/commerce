import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { Option } from 'store/CatalogPageStore/SortOptionsStore/SortOptionsStore';
import style from './OptionItem.module.scss';

type OptionItemProps = {
  option: Option;
  selectedOption: string;
};

const OptionItem: React.FC<OptionItemProps> = ({ selectedOption, option }) => {
  const rootStore = useRootStoreContext();

  const onSelectOption = useCallback(() => {
    rootStore.queryParams.updateParam('sort', option.value);
  }, [option.value, rootStore.queryParams]);

  return (
    <li
      className={classNames(style.dropdown__item, {
        [style.dropdown__item_active]: option.text === selectedOption,
      })}
      onClick={onSelectOption}
    >
      {option.text}
    </li>
  );
};

export default observer(OptionItem);
