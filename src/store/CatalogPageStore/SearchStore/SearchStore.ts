import { action, computed, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';
import RootStore from 'store/RootStore/RootStore';
import { ILocalStore } from 'utils/hooks/useLocalStore';

type PrivateFields = '_valueSearch';

export class SearchStore implements ILocalStore {
  private _valueSearch: string = '';
  private _rootStore: RootStore | null = null;
  private _reaction: IReactionDisposer | null = null;

  constructor(rootStore: RootStore) {
    makeObservable<SearchStore, PrivateFields>(this, {
      _valueSearch: observable,
      valueSearch: computed,
      setValue: action,
      clear: action,
    });

    this._rootStore = rootStore;
    this._initReaction();
  }

  get valueSearch(): string {
    return this._valueSearch;
  }

  setValue(value: string): void {
    this._valueSearch = value;
  }

  clear(): void {
    this._valueSearch = '';
  }

  destroy(): void {
    if (this._reaction) {
      this._reaction();
    }
  }

  private _initReaction(): void {
    this._reaction = reaction(
      () => this._valueSearch,
      (value) => this._rootStore?.queryParams.updateParam('search', value.trim()),
    );
  }
}
