import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Option } from 'store/CatalogPageStore/SortOptionsStore/SortOptionsStore';
import style from './OptionItem.module.scss';

type OptionItemProps = {
  option: Option;
  selectedOption: string;
  onChangeOption: (selectedOption: string | undefined) => void;
};

const OptionItem: React.FC<OptionItemProps> = ({ selectedOption, option, onChangeOption }) => {
  const onSelectOption = useCallback(() => {
    onChangeOption(option.value);
  }, [onChangeOption, option.value]);

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
