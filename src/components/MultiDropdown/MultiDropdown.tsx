/* eslint-disable no-unused-vars */
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import "./MultiDropdown.scss"

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

const MultiDropdown: React.FC<MultiDropdownProps> = ({className:cn, value, options,  onChange, getTitle, disabled}) => {
  const [openModal, setOpenModal] = useState(false);
  const [inpValue, setInpValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  
    const closeModal = useCallback((event: MouseEvent)=>{
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setOpenModal(false);
      }
    }, [])

    window.addEventListener("click", closeModal)
    
    const placeholder = getTitle(value)
    useEffect(()=>{
      if(!openModal){
        setInpValue(placeholder)
      }else{
        setInpValue("")
        setFilteredOptions(options)
      }

    }, [openModal, placeholder, options])
    

    const handlerClickInput = useCallback(()=>{
      if(openModal === false){
        setOpenModal(true)
      }
    },[openModal])

    const handlerChange = useCallback((str: string) => {
      setInpValue(str)
      setFilteredOptions(options.filter(item=>item.value.includes(str) ))
      if(str.trim() === ""){
        setFilteredOptions(options)
      }
      
    }, [options])

    const handlerSelectOption = (option: Option)=>{
        const isSelected = value.some(v => v.key === option.key);
      const newValue = isSelected
        ? value.filter(v => v.key !== option.key)
        : [...value, option]; 
      
        onChange(newValue)
    }
  
  return (
   
    <div ref={dropdownRef}  className={classNames("wrapper", cn)} >
      <Input 
     
        value={inpValue} 
        onChange={handlerChange} 
        afterSlot={<ArrowDownIcon />}  
        onClick={handlerClickInput} 
        placeholder={placeholder || "Text"} 
        disabled={disabled}
      />
        <div className='wrapper_items'> 
      {
       ( openModal && !disabled) && filteredOptions.map(elem =>(
          <div className={classNames('item', {"item_select": placeholder.includes(elem.value)})} key={elem.key}  onClick={() => handlerSelectOption(elem)}>
             {elem.value}
             </div>
        ))
      }
        </div>
    </div>
  );

};

export default React.memo(MultiDropdown);