import React, { useCallback, useState } from "react";
import { useQueryContext } from "App/provider/QueryContext";
import Button from "components/Button";
import Input from "components/Input";
import style from "./Search.module.scss"

const Search: React.FC = () => {
    const [valueInp, setValueInp] = useState<string>("")
    const queryContext = useQueryContext()

    if(!queryContext) {
        return
    }

    const {changeParamByKey} = queryContext

    const handlerChangeValue = useCallback((value: string) => {
        setValueInp(value)
    }, [setValueInp])

    const findProducts = useCallback(() => {
        changeParamByKey("search", valueInp)

        if(valueInp.trim() !== "") {
            changeParamByKey("page", "1")
        }
        setValueInp("")
        
    }, [changeParamByKey, valueInp, setValueInp])

  return (
    <div className={style.search}>
      <Input placeholder="Search product" value={valueInp} onChange={handlerChangeValue} />
      <Button onClick={findProducts}>Find now</Button>
    </div>
  );
};

export default Search;
