import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import rootStore from 'store/RootStore/instance';
import { useClickOutside } from 'utils/hooks/useClickOutside';
import { dataOptions, Option } from './data';
import style from './Dropdown.module.scss';

const Dropdown: React.FC = () => {
  const [selectOption, setSelectOption] = useState<string>('по популярности');
  const refSelect = useRef<null | HTMLDivElement>(null);

  const { openModal, setOpenModal } = useClickOutside(refSelect);

  useEffect(() => {
    const selectedOption = dataOptions.find((item: Option) => {
      if (rootStore.queryParams.params.sort) {
        return item.value === rootStore.queryParams.params.sort;
      } else {
        return item.value === '';
      }
    });

    if (selectedOption) {
      setSelectOption(selectedOption.text);
    }
  }, [rootStore.queryParams.params]);

  const handleClick = useCallback(() => setOpenModal(!openModal), [openModal, setOpenModal]);

  const onSelectOption = useCallback((option: Option) => {
    setSelectOption(option.text);
    rootStore.queryParams.updateParam('sort', option.value);
  }, []);

  return (
    <div className={style.dropdown}>
      <div className={style.dropdown__field} onClick={handleClick} ref={refSelect}>
        <div className={style[`dropdown__select-item`]}>{selectOption}</div>
        <ArrowDownIcon />
      </div>
      <ul className={classNames(style.dropdown__menu, { [style.dropdown__menu_open]: openModal })}>
        {dataOptions.map((item, index) => (
          <li
            key={index}
            className={classNames(style.dropdown__item, {
              [style.dropdown__item_active]: item.text === selectOption,
            })}
            onClick={() => onSelectOption(item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(Dropdown);
