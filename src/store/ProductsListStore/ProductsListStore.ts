import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import qs from 'qs';
import { normalizeProductApi, ProductApi, ProductModel } from 'store/models/product/product';
import { ParamsType } from 'types/typeParams';
import { apiClient } from 'utils/axiosConfig';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';

type PrivateField = '_listProducts' | '_meta' | '_total';

export class ProductListStore implements ILocalStore {
  private _listProducts: ProductModel[] = [];
  private _meta: string = Meta.initial;
  private _total: number = 0;

  constructor() {
    makeObservable<ProductListStore, PrivateField>(this, {
      _listProducts: observable.ref,
      _meta: observable,
      _total: observable,
      allProducts: computed,
      relatedProducts: computed,
      meta: computed,
      total: computed,
      getProducts: action,
    });
  }

  get allProducts(): ProductModel[] {
    return this._listProducts;
  }

  get relatedProducts(): ProductModel[] {
    return this._listProducts;
  }

  get meta(): string {
    return this._meta;
  }

  get total(): number {
    return this._total;
  }

  getProducts(params: ParamsType): void {
    this._meta = Meta.loading;
    this._listProducts = [];

    apiClient
      .get<{ data: ProductApi[]; meta: { pagination: { total: number } } }>(`/products?${qs.stringify(params)}`)
      .then(({ data }) => {
        runInAction(() => {
          this._listProducts = data.data.map(normalizeProductApi);
          this._meta = Meta.success;
          this._total = data.meta.pagination.total;
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
