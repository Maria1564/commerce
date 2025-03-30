import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQueryContext } from "app/provider/QueryContext";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import { useClickOutside } from "utils/hooks/useClickOutside";
import { dataOptions, Option } from "./data";
import style from "./Dropdown.module.scss";

const Dropdown: React.FC = () => {
  const [selectOption, setSelectOption] = useState<string>("по популярности");
  const refSelect = useRef<null | HTMLDivElement>(null);
  const queryContext = useQueryContext();
  const { openModal, setOpenModal } = useClickOutside(refSelect);

  if (!queryContext) {
    return;
  }
  const { params, changeParamByKey } = queryContext;

  useEffect(() => {
    const selectedOption = dataOptions.find((item: Option) => {
      if (params.sort) {
        return item.value === params.sort;
      } else {
        return item.value === "";
      }
    });

    if (selectedOption) {
      setSelectOption(selectedOption.text);
    }

  
  }, []);

  const handleClick = useCallback(
    
    () => setOpenModal(!openModal),
    [openModal],
  );

  const onSelectOption = useCallback((option: Option) => {
    setSelectOption(option.text);
    changeParamByKey("sort", option.value);
  }, []);

  return (
    <div className={style.dropdown}>
      <div className={style.select} onClick={handleClick} ref={refSelect}>
        <div className={style.select_item}>{selectOption}</div>
        <ArrowDownIcon />
      </div>
      <ul
        className={classNames(style.menu, { [style.menu_open]: openModal })}
      >
        {dataOptions.map((item, index) => (
          <li
            key={index}
            className={classNames(style.menu_item, {
              [style.active]: item.text === selectOption,
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
