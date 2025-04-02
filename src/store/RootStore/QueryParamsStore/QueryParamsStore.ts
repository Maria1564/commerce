import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type queryParams = {
  [key: string]: string;
};

type PrivateFields = '_params';

export class QueryParamsStore {
  private _params: queryParams = {};

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      params: computed,
      updateParam: action,
    });
  }

  get params(): queryParams {
    return this._params;
  }

  updateParam(key: string, value: string): void {
    runInAction(() => {
      if (value === '') {
        const { [key]: _, ...other } = this._params;
        this._params = other;
      } else {
        this._params = { ...this._params, [key]: value };
      }
    });
  }
}
