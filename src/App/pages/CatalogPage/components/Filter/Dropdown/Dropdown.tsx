import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQueryContext } from "App/provider/QueryContext";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import { dataOptions, Option } from "./data";
import style from "./Dropdown.module.scss";

const Dropdown: React.FC = () => {
  const [selectOption, setSelectOption] = useState<string>("по популярности");
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const refMenu = useRef<null | HTMLUListElement>(null);
  const queryContext = useQueryContext();

  if (!queryContext) {
    return;
  }
  const { params, changeParamByKey } = queryContext;

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(`.${style.menu}`) === null &&
        !target.closest(`.${style.select}`)
      ) {
        setIsOpenMenu(false);
      }
    };

    window.document.addEventListener("click", closeMenu);

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

    return () => window.document.removeEventListener("click", closeMenu);
  }, []);

  const handleClick = useCallback(
    () => setIsOpenMenu(!isOpenMenu),
    [isOpenMenu]
  );

  const onSelectOption = useCallback((option: Option) => {
    setSelectOption(option.text);
    changeParamByKey("sort", option.value);
  }, []);

  
  return (
    <div className={style.dropdown}>
      <div className={style.select} onClick={handleClick}>
        <div className={style.select_item}>{selectOption}</div>
        <ArrowDownIcon />
      </div>
      <ul
        className={classNames(style.menu, { [style.menu_open]: isOpenMenu })}
        ref={refMenu}
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
