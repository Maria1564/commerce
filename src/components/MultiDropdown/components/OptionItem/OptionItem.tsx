import classNames from "classnames";
import React, { useCallback } from "react";
import { Option } from "components/MultiDropdown/MultiDropdown";

type OptionItemProps = {
  option: Option;
  onChange: (value: Option[]) => void;
  placeholder: string;
  value: Option[];
};

const OptionItem: React.FC<OptionItemProps> = ({
  option,
  onChange,
  placeholder,
  value,
}) => {
  const handlerSelectOption = useCallback(() => {
    const isSelected = value.some((v) => v.key === option.key);

    const newValue = isSelected
      ? value.filter((v) => v.key !== option.key)
      : [...value, option];

    onChange(newValue);
  }, [value]);

  return (
    <div
      className={classNames("item", {
        item_select: placeholder.includes(option.value),
      })}
      key={option.key}
      onClick={handlerSelectOption}
    >
      {option.value}
    </div>
  );
};

export default React.memo(OptionItem);
