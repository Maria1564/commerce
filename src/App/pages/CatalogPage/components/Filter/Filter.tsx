import React, { useCallback, useState } from "react";
import MultiDropdown, { Option } from "components/MultiDropdown";
import Search from "./Search";
import style from "./Filter.module.scss";

const Filter: React.FC = () => {
const [data, setData] = useState<Option[]>([])

  const handlerChange = useCallback(
    (value: Option[]) =>{
      setData([...value])
    },[setData]
  );

  const getTitle = useCallback((value: Option[]) => {
    const valuesStr = value.map(item => item.value)
    return valuesStr.join(", ")
  }, [data])

  return (
    <div className={style.wrapper}>
      <Search/>
      <MultiDropdown
        options={[
          { key: "el", value: "electrical" },
          { key: "cl", value: "closest" },
        ]}
        value={data}
        onChange={handlerChange}
        getTitle={getTitle}
        className={style.dropdown}
      />
    </div>
  );
};

export default Filter;
