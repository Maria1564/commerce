import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import style from './FavoriteToggle.module.scss';

type FavoriteToggleProps = {
  idProduct: string;
};

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({ idProduct }) => {
  const { favorites } = useRootStoreContext();

  const toggleFavorite = () => {
    favorites.toggle(idProduct);
  };

  return (
    <>
      {favorites.isFavorite(idProduct) ? (
        <MdFavorite className={classNames(style.favorite, style.favorite_active)} onClick={toggleFavorite} />
      ) : (
        <MdFavoriteBorder className={style.favorite} onClick={toggleFavorite} />
      )}
    </>
  );
};

export default observer(FavoriteToggle);
