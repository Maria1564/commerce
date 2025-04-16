import { observer } from 'mobx-react-lite';
import React from 'react';
import { MdEdit } from 'react-icons/md';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { UserIcon } from 'components/icons/UserIcon';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import style from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  const { auth } = useRootStoreContext();

  return (
    <div className={style.profile}>
      <Text tag="h2" color="primary" view="title">
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
              <input type="text" className={style.profile__field} value={auth.user?.username} />
              <MdEdit className={style[`profile__icon-edit`]} />
            </div>
          </div>
          <div className={style.profile__item}>
            <Text weight="medium" view="p-20" tag="span" color="primary">
              Почта
            </Text>
            <input type="text" className={style.profile__field} value={auth.user?.login} />
          </div>
          <Button className={style.profile__save}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
};

export default observer(ProfilePage);
