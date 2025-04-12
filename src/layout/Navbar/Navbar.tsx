import React from 'react';
import { Container } from 'components/Container';
import { Text } from 'components/Text';
import { BagIcon } from 'components/icons/BagIcon';
import { UserIcon } from 'components/icons/UserIcon';
import Header from './components/Header';
import Link from './components/Link';
import ToggleTheme from './components/ToggleTheme';
import { links } from './data';
import style from './Navbar.module.scss';

const Navbar: React.FC = () => {
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
          <BagIcon className={style.navbar__icon} />
          <UserIcon className={style.navbar__icon} />
          <ToggleTheme />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
