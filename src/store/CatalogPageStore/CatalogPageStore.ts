import { computed, makeObservable, observable } from 'mobx';
import RootStore from 'store/RootStore/RootStore';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { CategoryFilterStore } from './CategoryFilterStore/CategoryFilterStore';
import { PaginationStore } from './PaginationStore/PaginationStore';
import { ProductListStore } from './ProductsListStore/ProductsListStore';
import { SearchStore } from './SearchStore/SearchStore';
import { SortOptionsStore } from './SortOptionsStore/SortOptionsStore';

type PrivateFields = '_categoriesStore' | '_paginationStore' | '_productsStore' | '_searchStore' | '_sortStore';

export class CatalogPageStore implements ILocalStore {
  private readonly _productsStore: ProductListStore = new ProductListStore();
  private readonly _categoriesStore: CategoryFilterStore | null = null;
  private readonly _paginationStore: PaginationStore | null = null;
  private readonly _searchStore: SearchStore | null = null;
  private readonly _sortStore: SortOptionsStore | null = null;

  constructor(rootStore: RootStore) {
    this._paginationStore = new PaginationStore(rootStore);
    this._categoriesStore = new CategoryFilterStore(rootStore);
    this._searchStore = new SearchStore(rootStore);
    this._sortStore = new SortOptionsStore(rootStore)

    makeObservable<CatalogPageStore, PrivateFields>(this, {
      _categoriesStore: observable,
      _paginationStore: observable,
      _productsStore: observable,
      _searchStore: observable,
      _sortStore: observable,
      productsStore: computed,
      categoriesStore: computed,
      searchStore: computed,
      sortStore: computed,
      paginationStore: computed,
    });
  }

  get productsStore(): ProductListStore {
    return this._productsStore;
  }

  get categoriesStore(): CategoryFilterStore {
    return this._categoriesStore!;
  }

  get searchStore(): SearchStore {
    return this._searchStore!;
  }

  get sortStore(): SortOptionsStore {
    return this._sortStore!;
  }

  get paginationStore(): PaginationStore {
    return this._paginationStore!;
  }

  destroy(): void {}
}
