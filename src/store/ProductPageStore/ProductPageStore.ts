import { computed, makeObservable, observable } from 'mobx';
import { ProductListStore } from 'store/CatalogPageStore/ProductsListStore/ProductsListStore';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { ProductDetailsStore } from './ProductDetailsStore/ProductDetailsStore';

type PrivateFields = '_productsStore' | '_productStore';

export class ProductPageStore implements ILocalStore {
  private readonly _productsStore: ProductListStore = new ProductListStore();
  private readonly _productStore: ProductDetailsStore = new ProductDetailsStore();

  constructor() {
    makeObservable<ProductPageStore, PrivateFields>(this, {
      _productsStore: observable,
      _productStore: observable,
      productsStore: computed,
      productStore: computed,
    });
  }

  get productsStore(): ProductListStore {
    return this._productsStore;
  }

  get productStore(): ProductDetailsStore {
    return this._productStore;
  }

  destroy(): void {}
}
