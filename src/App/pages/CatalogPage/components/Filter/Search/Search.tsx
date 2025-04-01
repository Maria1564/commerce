import React, { useCallback, useState } from 'react';
import { useQueryContext } from 'app/provider/QueryContext';
import Button from 'components/Button';
import Input from 'components/Input';
import style from './Search.module.scss';

const Search: React.FC = () => {
  const [valueInp, setValueInp] = useState<string>('');
  const queryContext = useQueryContext();

  if (!queryContext) {
    return;
  }

  const { updaterQueryParams } = queryContext;

  const handlerChangeValue = useCallback(
    (value: string) => {
      setValueInp(value);
    },
    [setValueInp],
  );

  const findProducts = useCallback(() => {
    updaterQueryParams({ search: valueInp });

    if (valueInp.trim() !== '') {
      updaterQueryParams({ page: '1' });
    }
    setValueInp('');
  }, [updaterQueryParams, valueInp, setValueInp]);

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
