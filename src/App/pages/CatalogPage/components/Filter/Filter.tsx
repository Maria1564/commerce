import React, { useCallback, useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
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
      <div className={style.search}>
        <Input placeholder="Search product" value="" onChange={() => {}} />
        <Button>Find now</Button>
      </div>
      
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
