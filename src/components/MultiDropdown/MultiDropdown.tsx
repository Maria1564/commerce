import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { useClickOutside } from 'utils/hooks/useClickOutside';
import OptionItem from './components/OptionItem';
import style from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className: cn,
  value,
  options,
  onChange,
  getTitle,
  disabled,
}) => {
  const [inpValue, setInpValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { openModal, setOpenModal } = useClickOutside(dropdownRef);

  const placeholder = getTitle(value);
  useEffect(() => {
    if (!openModal) {
      setInpValue(placeholder);
    } else {
      setInpValue('');
      setFilteredOptions(options);
    }
  }, [openModal, placeholder, options]);

  const handlerClickInput = useCallback(() => {
    if (openModal === false) {
      setOpenModal(true);
    }
  }, [openModal, setOpenModal]);

  const handlerChange = useCallback(
    (str: string) => {
      setInpValue(str);
      setFilteredOptions(options.filter((item) => item.value.includes(str)));
      if (str.trim() === '') {
        setFilteredOptions(options);
      }
    },
    [options],
  );

  return (
    <div ref={dropdownRef} className={classNames(style.multydropdown, cn)}>
      <Input
        value={inpValue}
        onChange={handlerChange}
        afterSlot={<ArrowDownIcon className={style[`multydropdown__arrow-down`]} />}
        onClick={handlerClickInput}
        placeholder={placeholder || 'Text'}
        disabled={disabled}
      />
      <div className={style.multydropdown__list}>
        {openModal &&
          !disabled &&
          filteredOptions.map((elem) => (
            <OptionItem placeholder={placeholder} key={elem.key} option={elem} onChange={onChange} value={value} />
          ))}
      </div>
    </div>
  );
};

export default React.memo(MultiDropdown);
