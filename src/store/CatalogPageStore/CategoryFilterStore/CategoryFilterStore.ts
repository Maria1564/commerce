import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import qs from 'qs';
import RootStore from 'store/RootStore/RootStore';
import {
  FilterCategoryApi,
  FilterCategoryModel,
  normalizeFilterCategoryApi,
} from 'store/models/category/filterCategory';
import { RequestParams } from 'types/typeParams';
import { apiClient } from 'utils/axiosConfig';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';

type PrivateFields = '_categories' | '_meta' | '_selectedCategories';

export class CategoryFilterStore implements ILocalStore {
  private _categories: FilterCategoryModel[] = [];
  private _meta: string = Meta.initial;
  private _selectedCategories: FilterCategoryModel[] = [];
  private _rootStore: RootStore | null = null;
  private _reaction: IReactionDisposer | null = null;

  constructor(rootStore: RootStore) {
    makeObservable<CategoryFilterStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      _selectedCategories: observable.ref,
      meta: computed,
      categories: computed,
      getCategories: action,
      addSelectedCategories: action,
    });

    this._rootStore = rootStore;
    this._initReaction();
  }

  get meta(): string {
    return this._meta;
  }

  get categories(): FilterCategoryModel[] {
    return this._categories;
  }

  get selectedCategories(): FilterCategoryModel[] {
    return this._selectedCategories;
  }

  getCategories(params: RequestParams): void {
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

  addSelectedCategories(categories: FilterCategoryModel[]): void {
    this._selectedCategories = categories;
  }

  destroy(): void {
    if (this._reaction) {
      this._reaction();
    }
  }

  private _initReaction(): void {
    this._reaction = reaction(
      () => this._selectedCategories,
      () => {
        let strCategory = this._selectedCategories.map((item) => item.value).join(',');
        this._rootStore?.queryParams.updateParam('category', strCategory);
      },
    );
  }
}
