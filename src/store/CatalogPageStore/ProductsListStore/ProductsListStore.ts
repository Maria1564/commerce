import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import qs from 'qs';
import { normalizeProductApi, ProductApi, ProductModel } from 'store/models/product/product';
import { RequestParams } from 'types/typeParams';
import { apiClient } from 'utils/axiosConfig';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { Meta } from 'utils/meta';

type PrivateField = '_listProducts' | '_meta' | '_total';

export class ProductListStore implements ILocalStore {
  private _listProducts: ProductModel[] = [];
  private _meta: string = Meta.initial;
  private _total: number = 0;
  private _requestParams: RequestParams = {};

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

  private _createRequestParams(params: { [key: string]: string }, pageSize: number): void {
    this._requestParams = {
      populate: ['images', 'productCategory'],
      pagination: {
        pageSize: pageSize,
        page: Number(params.page || 0),
      },
      ...((params.search || params.category || params.priceMin || params.priceMax || params.excludeId) && {
        filters: {
          ...(params.search && {
            title: {
              $containsi: params.search,
            },
          }),

          ...(params.category && {
            productCategory: {
              title: {
                $containsi: params.category.split(','),
              },
            },
          }),

          ...(params.priceMin &&
            params.priceMax && {
              price: {
                $gte: Number(params.priceMin),
                $lte: Number(params.priceMax),
              },
            }),

          ...(params.excludeId && {
            documentId: {
              $ne: params.excludeId,
            },
          }),
        },
      }),
      ...(params.sort && { sort: params.sort }),
    };
  }

  getProducts(params: { [key: string]: string }, pageSize: number): void {
    this._meta = Meta.loading;
    this._listProducts = [];
    this._createRequestParams(params, pageSize);

    apiClient
      .get<{ data: ProductApi[]; meta: { pagination: { total: number } } }>(
        `/products?${qs.stringify(this._requestParams)}`,
      )
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
