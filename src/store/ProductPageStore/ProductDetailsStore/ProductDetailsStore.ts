import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import qs from 'qs';
import { normalizeProductApi, ProductApi, ProductModel } from 'store/models/product/product';
import { RequestParams } from 'types/typeParams';
import { apiClient } from 'utils/axiosConfig';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';

type PrivateField = '_product' | '_meta';

export class ProductDetailsStore implements ILocalStore {
  private _product: ProductModel | null = null;
  private _meta: string = Meta.initial;

  constructor() {
    makeObservable<ProductDetailsStore, PrivateField>(this, {
      _product: observable.ref,
      _meta: observable,
      product: computed,
      meta: computed,
      getSelectedProduct: action,
    });
  }

  get product(): ProductModel | null {
    return this._product;
  }

  get meta(): string {
    return this._meta;
  }

  getSelectedProduct(id: string, params: RequestParams): void {
    this._meta = Meta.loading;
    this._product = null;

    apiClient
      .get<{ data: ProductApi }>(`/products/${id}?${qs.stringify(params)}`)
      .then(({ data }) => {
        runInAction(() => {
          this._product = normalizeProductApi(data.data);
          this._meta = Meta.success;
        });
      })
      .catch(() => {
        runInAction(() => {
          this._meta = Meta.error;
        });
      });
  }

  destroy() {}
}
