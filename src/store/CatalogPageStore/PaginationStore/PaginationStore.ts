import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import qs from 'qs';
import RootStore from 'store/RootStore/RootStore';
import { RequestParams } from 'types/typeParams';
import { apiClient } from 'utils/axiosConfig';
import { ILocalStore } from 'utils/hooks/useLocalStore';

type PrivateField = '_pages' | '_totalPages' | '_currentPage' | '_createPagination';

export class PaginationStore implements ILocalStore {
  private _pages: number[] = [];
  private _totalPages: number = 0;
  private _currentPage: number = 0;
  private _requestPrams: RequestParams = {};
  private _reaction: IReactionDisposer | null = null;
private _rootStore: RootStore | null = null
  constructor(rootStore: RootStore) {
    makeObservable<PaginationStore, PrivateField>(this, {
      _pages: observable,
      _totalPages: observable,
      _currentPage: observable,
      _createPagination: action,
      pages: computed,
      currentPage: computed,
      totalPages: computed,
      getInfoPage: action,
      togglePage: action,
      goToNextPage: action,
      goToPrevPage: action,
    });
    this._rootStore = rootStore
    this._initReaction();
  }

  get pages(): number[] {
    return this._pages;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  private _createRequestParams(params: { [key: string]: string }): void {
    this._requestPrams = {
      pagination: {
        page: Number(params.page),
        pageSize: 9,
      },
      ...((params.search || params.category) && {
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
        },
      }),
    };
  }

  private _createPagination(): void {
    this._pages = [];
    if (this._totalPages === 0) {
      this._pages = [];
      return;
    }
    if (this._totalPages === 1) {
      this._pages = [1];
      return;
    }

    if (this._totalPages === 2) {
      this._pages = [1, 2];
      return;
    }

    if (this._currentPage === 1) {
      this._pages.push(1, 2, 3);
    } else if (this._currentPage === this._totalPages) {
      this._pages.push(this._currentPage - 2, this._currentPage - 1, this._currentPage);
    } else {
      this._pages.push(this._currentPage - 1, this._currentPage, this._currentPage + 1);
    }
  }

  getInfoPage(params: { [key: string]: string }): void {
    this._createRequestParams(params);
    apiClient
      .get<{
        meta: { pagination: { page: number; pageCount: number } };
      }>(`/products?${qs.stringify(this._requestPrams)}`)
      .then(({ data }) => {
        runInAction(() => {
          if (data.meta.pagination.page > data.meta.pagination.pageCount) {
            this._currentPage = 1;
          } else {
            this._currentPage = data.meta.pagination.page;
          }
          this._totalPages = data.meta.pagination.pageCount;
        });
      });
  }

  togglePage(selectedPage: number): void {
    this._currentPage = selectedPage;
  }

  goToNextPage(): void {
    this._currentPage += 1;
  }

  goToPrevPage(): void {
    this._currentPage -= 1;
  }

  destroy(): void {
    if (this._reaction) {
      this._reaction();
    }
  }

  private _initReaction() {
    this._reaction = reaction(
      () => [this._currentPage, this._totalPages],
      () => {
        this._rootStore?.queryParams.updateParam("page", String (this._currentPage))
        this._createPagination();
      },
    );
  }
}
