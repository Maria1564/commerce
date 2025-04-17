import React, { useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { Text } from 'components/Text';
import { InputStore } from 'store/InputStore/InputStore';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import style from './Info.module.scss';

type InfoProps = {
  editable?: boolean;
  label: string;
  value: string;
};

const Info: React.FC<InfoProps> = ({ label, value, editable = false }) => {
  const inputStore = useLocalStore(() => new InputStore());

  useEffect(() => {
    inputStore.setValue(value);
  }, [inputStore, value]);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputStore.setValue(e.target.value);
  };

  return (
    <div className={style.info}>
      <Text weight="medium" view="p-20" tag="span" color="primary">
        {label}
      </Text>
      {editable ? (
        <div className={style.info__wrapper}>
          <input type="text" className={style.info__field} value={inputStore.value} onChange={onChangeUsername} />
          <MdEdit className={style[`info__icon-edit`]} />
        </div>
      ) : (
        <input type="text" className={style.info__field} value={value} />
      )}
    </div>
  );
};

export default Info;
