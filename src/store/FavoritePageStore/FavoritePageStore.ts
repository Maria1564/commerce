import { computed, makeObservable, observable } from 'mobx';
import { ProductListStore } from 'store/CatalogPageStore/ProductsListStore/ProductsListStore';
import { ILocalStore } from 'utils/hooks/useLocalStore';

type PrivateFields = '_productsStore';

export class FavoritePageStore implements ILocalStore {
  private readonly _productsStore: ProductListStore = new ProductListStore();

  constructor() {
    makeObservable<FavoritePageStore, PrivateFields>(this, {
      _productsStore: observable,
      productsStore: computed,
    });
  }

  get productsStore(): ProductListStore {
    return this._productsStore;
  }

  destroy(): void {}
}
