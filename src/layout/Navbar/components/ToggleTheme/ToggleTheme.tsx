import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import style from './ToggleTheme.module.scss';

const ToggleTheme: React.FC = () => {
  const { theme } = useRootStoreContext();

  const onToggleTheme = () => {
    theme.toggleTheme();
  };

  return (
    <div onClick={onToggleTheme} className={style.toggle}>
      {theme.currentTheme === 'light' ? 'light' : 'dark'}
    </div>
  );
};

export default observer(ToggleTheme);
