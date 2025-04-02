import React, { useCallback, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import rootStore from 'store/RootStore/instance';
import style from './Search.module.scss';

const Search: React.FC = () => {
  const [valueInp, setValueInp] = useState<string>('');


  const handlerChangeValue = useCallback(
    (value: string) => {
      setValueInp(value);
    },
    [setValueInp],
  );

  const findProducts = useCallback(() => {
    rootStore.queryParams.updateParam("search",  valueInp );

    if (valueInp.trim() !== '') {
      rootStore.queryParams.updateParam("page", "1");
    }
    setValueInp('');
  }, [valueInp, setValueInp]);

  return (
    <div className={style.search}>
      <Input
        placeholder="Search product"
        value={valueInp}
        onChange={handlerChangeValue}
        className={style.search__input}
      />
      <Button onClick={findProducts}>Find now</Button>
    </div>
  );
};

export default Search;
