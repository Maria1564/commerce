import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { useCategoryListContext } from 'store/CategoryListPageStore/CategoryListPageProvider';
import { Meta } from 'utils/meta';
import { CategoryCard } from './components/CategoryCard';
import { iconMapping } from './iconMapping';
import style from './CategoryListPage.module.scss';

const CategoryListPage: React.FC = () => {
  const { categoriesStore } = useCategoryListContext();

  useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  return (
    <div className={style.categories}>
      <Text tag="h2" view="title" color="primary">
        Категории
      </Text>
      <div className={style.categories__list}>
        {categoriesStore.meta === Meta.loading && <Loader />}
        {categoriesStore.meta === Meta.success &&
          categoriesStore.categories.map((item) => (
            <CategoryCard key={item.id} nameCategory={item.title} IconComponent={iconMapping[item.title]} />
          ))}
      </div>
    </div>
  );
};

export default observer(CategoryListPage);
