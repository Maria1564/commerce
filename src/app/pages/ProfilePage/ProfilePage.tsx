import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { UserIcon } from 'components/icons/UserIcon';
import { InputStore } from 'store/InputStore/InputStore';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import style from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  const { auth } = useRootStoreContext();
  const inputStore = useLocalStore(() => new InputStore());

  useEffect(() => {
    if (auth.user) {
      inputStore.setValue(auth.user?.username);
    }
  }, [auth.user, inputStore]);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputStore.setValue(e.target.value);
  };

  const onSave = useCallback(() => {
    auth.setUsername(inputStore.value);
  }, [auth, inputStore.value]);

  return (
    <div className={style.profile}>
      <Text tag="h2" color="primary" view="title" className={style.profile__title}>
        Профиль
      </Text>

      <div className={style.profile__wrapper}>
        <UserIcon className={style[`profile__user-icon`]} />
        <div className={style.profile__info}>
          <div className={style.profile__item}>
            <Text weight="medium" view="p-20" tag="span" color="primary">
              Имя
            </Text>
            <div className={style.profile__username}>
              <input
                type="text"
                className={style.profile__field}
                value={inputStore.value}
                onChange={onChangeUsername}
              />
              <MdEdit className={style[`profile__icon-edit`]} />
            </div>
          </div>
          <div className={style.profile__item}>
            <Text weight="medium" view="p-20" tag="span" color="primary">
              Почта
            </Text>
            <input type="text" className={style.profile__field} value={auth.user?.login} />
          </div>
          <Button className={style[`profile__btn-save`]} onClick={onSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(ProfilePage);
