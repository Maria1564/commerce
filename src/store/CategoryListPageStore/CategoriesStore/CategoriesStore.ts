import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { CategoryApi, CategoryModel, normalizeCategoryApi } from 'store/models/category/category';
import { apiClient } from 'utils/axiosConfig';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';

type PrivateFields = '_categories' | '_meta';

export class CategoriesStore implements ILocalStore {
  private _categories: CategoryModel[] = [];
  private _meta: string = Meta.initial;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable,
      _meta: observable,
      meta: computed,
      categories: computed,
      getCategories: action,
    });
  }

  get meta(): string {
    return this._meta;
  }

  get categories(): CategoryModel[] {
    return this._categories;
  }

  getCategories(): void {
    this._categories = [];
    this._meta = Meta.loading;

    apiClient
      .get<{ data: CategoryApi[] }>(`/product-categories`)
      .then(({ data }) => {
        runInAction(() => {
          this._categories = data.data.map(normalizeCategoryApi);
          this._meta = Meta.success;
        });
      })
      .catch(() => {
        runInAction(() => {
          this._meta = Meta.error;
        });
      });
  }

  destroy(): void {}
}
