import { action, computed, makeObservable, observable } from 'mobx';
import { ProductsCart } from '../CartStore/CartStore';

type OrderState = 'processing' | 'shipped' | 'delivered';



export type Order = {
  id: number;
  total: number;
  status: OrderState;
  products: ProductsCart[];
};

type PrivateFields = '_orders' | '_restoreSessionFromStorage';

export class OrderHistoryStore {
  private _orders: Order[] = [];

  constructor() {
    makeObservable<OrderHistoryStore, PrivateFields>(this, {
      _orders: observable,
      orders: computed,
      _restoreSessionFromStorage: action,
      addOrder: action,
    });

    this._restoreSessionFromStorage();
  }

  get orders(): Order[] {
    return this._orders;
  }

  addOrder(products: ProductsCart[], sum: number): void {
    this._orders.unshift({
      id: this._orders.length + 1,
      total: sum,
      status: 'processing',
      products,
    });

    localStorage.setItem('orders', JSON.stringify(this._orders));
  }

  private _restoreSessionFromStorage(): void {
    const orders = localStorage.getItem('orders');

    if (orders) {
      this._orders = JSON.parse(orders);
    }
  }
}
