import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'components/Container';
import { Text } from 'components/Text';
import { BagIcon } from 'components/icons/BagIcon';
import { UserIcon } from 'components/icons/UserIcon';
import { Routes } from 'config/routes';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import Header from './components/Header';
import Link from './components/Link';
import ToggleTheme from './components/ToggleTheme';
import { links } from './data';
import style from './Navbar.module.scss';

const Navbar: React.FC = () => {
  const { cart } = useRootStoreContext(); 
  const navigate = useNavigate()

  const handleNavigate = useCallback(() => {
    navigate(Routes.cart)
  }, [navigate])

  return (
    <div className={style.navbar}>
      <Container className={style.navbar__container}>
        <Header />
        <div className={style.navbar__menu}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              isActive={({ isActive }) => (isActive ? style.navbar__link_active : style.navbar__link)}
              children={
                <Text view="p-18" weight="medium">
                  {link.text}
                </Text>
              }
            />
          ))}
        </div>
        <div className={style.navbar__actions}>
          <div className={classNames(style.navbar__icon, cart.isAdded && style.navbar__icon_active)} onClick={handleNavigate}>
            <BagIcon />
          </div>
          <UserIcon className={style.navbar__icon} />
          <ToggleTheme />
        </div>
      </Container>
    </div>
  );
};

export default observer(Navbar);
