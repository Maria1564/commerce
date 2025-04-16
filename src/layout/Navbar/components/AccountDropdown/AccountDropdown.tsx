import classNames from 'classnames';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { UserIcon } from 'components/icons/UserIcon';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { useClickOutside } from 'utils/hooks/useClickOutside';
import style from './AccountDropdown.module.scss';

const AccountDropdown: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { openModal, setOpenModal } = useClickOutside(ref);
  const { auth } = useRootStoreContext();
  const navigate = useNavigate();

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onLogout = () => {
    auth.logout();
    navigate(`/login`, { replace: true });
  };

  const onNavigate = () => {
    navigate(`/profile`)
  }

  return (
    <div className={style[`account-drop`]}>
      <div ref={ref} onClick={onOpenModal}>
        <UserIcon className={style[`account-drop__icon`]} />
      </div>
      {openModal && (
        <div className={style[`account-drop__panel`]}>
          <div className={style[`account-drop__panel-item`]} onClick={onNavigate}>профиль</div>
          <div
            className={classNames(style[`account-drop__logout`], style[`account-drop__panel-item`])}
            onClick={onLogout}
          >
            выйти
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
