import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/hooks/useLocalStore';

type PrivateFields = '_valueSearch';

export class SearchStore implements ILocalStore {
  private _valueSearch: string = '';

  constructor() {
    makeObservable<SearchStore, PrivateFields>(this, {
      _valueSearch: observable,
      valueSearch: computed,
      setValue: action,
      clear: action,
    });
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

  destroy(): void {}
}
