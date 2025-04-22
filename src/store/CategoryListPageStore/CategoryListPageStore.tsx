import { computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { CategoriesStore } from './CategoriesStore/CategoriesStore';

type PrivateFields = '_categoriesStore';

export class CategoryListPageStore implements ILocalStore {
  private _categoriesStore: CategoriesStore = new CategoriesStore();

  constructor() {
    makeObservable<CategoryListPageStore, PrivateFields>(this, {
      _categoriesStore: observable,
      categoriesStore: computed,
    });
  }

  get categoriesStore(): CategoriesStore {
    return this._categoriesStore;
  }

  destroy(): void {}
}
