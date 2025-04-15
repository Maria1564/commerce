import { computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/hooks/useLocalStore';
import { OrderFormStore } from './OrderFormStore/OrderFormStore';

type PrivateFields = '_orderFormStore';

export class CartPageStore implements ILocalStore {
  private _orderFormStore: OrderFormStore = new OrderFormStore();

  constructor() {
    makeObservable<CartPageStore, PrivateFields>(this, {
      _orderFormStore: observable,
      orderFormStore: computed,
    });
  }

  get orderFormStore(): OrderFormStore {
    return this._orderFormStore;
  }

  destroy(): void {}
}
