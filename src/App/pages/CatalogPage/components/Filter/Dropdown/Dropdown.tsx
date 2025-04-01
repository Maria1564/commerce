import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryContext } from 'app/provider/QueryContext';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { useClickOutside } from 'utils/hooks/useClickOutside';
import { dataOptions, Option } from './data';
import style from './Dropdown.module.scss';

const Dropdown: React.FC = () => {
  const [selectOption, setSelectOption] = useState<string>('по популярности');
  const refSelect = useRef<null | HTMLDivElement>(null);
  const queryContext = useQueryContext();
  const { openModal, setOpenModal } = useClickOutside(refSelect);

  if (!queryContext) {
    return;
  }
  const { values, updaterQueryParams } = queryContext;

  useEffect(() => {
    const selectedOption = dataOptions.find((item: Option) => {
      if (values.sort) {
        return item.value === values.sort;
      } else {
        return item.value === '';
      }
    });

    if (selectedOption) {
      setSelectOption(selectedOption.text);
    }
  }, [values]);

  const handleClick = useCallback(() => setOpenModal(!openModal), [openModal]);

  const onSelectOption = useCallback((option: Option) => {
    setSelectOption(option.text);
    updaterQueryParams({ sort: option.value });
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

export default Dropdown;
