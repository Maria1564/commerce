import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import qs from 'qs';
import {
  FilterCategoryApi,
  FilterCategoryModel,
  normalizeFilterCategoryApi,
} from 'store/models/category/filterCategory';
import { ParamsType } from 'types/typeParams';
import { apiClient } from 'utils/axiosConfig';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';

type PrivateFields = '_categories' | '_meta';

export class CategoryFilterStore implements ILocalStore {
  private _categories: FilterCategoryModel[] = [];
  private _meta: string = Meta.initial;

  constructor() {
    makeObservable<CategoryFilterStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      meta: computed,
      categories: computed,
      getCategories: action,
    });
  }

  get meta(): string {
    return this._meta;
  }

  get categories(): FilterCategoryModel[] {
    return this._categories;
  }

  getCategories(params: ParamsType): void {
    this._meta = Meta.loading;
    this._categories = [];

    apiClient
      .get<{ data: FilterCategoryApi[] }>(`/product-categories?${qs.stringify(params)}`)
      .then(({ data }) => {
        runInAction(() => {
          this._categories = data.data.map(normalizeFilterCategoryApi);
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
