import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Text } from 'components/Text';
import { useFavoritePageContext } from 'store/FavoritePageStore/FavoritePageProvider';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { FavoriteCard } from './FavoriteCard';
import style from './FavoritePage.module.scss';

const FavoritePage: React.FC = () => {
  const { favorites } = useRootStoreContext();
  const { productsStore } = useFavoritePageContext();

  useEffect(() => {
    productsStore.getProducts({}, 40);
  }, [productsStore]);

  return (
    <div className={style.favorite}>
      <Text tag="h2" color="primary" view="title">
        Избранное
      </Text>
      <div className={style.favorite__list}>
        {productsStore.allProducts.map((item) => {
          if (favorites.isFavorite(item.id)) {
            return <FavoriteCard key={item.id} item={item} />;
          }

          return <Fragment key={item.id}></Fragment>;
        })}
      </div>
    </div>
  );
};

export default observer(FavoritePage);
