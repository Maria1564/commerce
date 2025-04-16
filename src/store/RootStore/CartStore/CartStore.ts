import { action, computed, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';
import { ProductModel } from 'store/models/product/product';
import { ILocalStore } from 'utils/hooks/useLocalStore';

export type ProductsCart = {
  id: string;
  title: string;
  imgUrl: string;
  price: number;
  sum: number;
  count: number;
};

type PrivateFields = '_productsList' | '_totalCartAmount' | '_isAdded';

export class CartStore implements ILocalStore {
  private _productsList: ProductsCart[] = [];
  private _totalCartAmount: number = 0;
  private _isAdded: boolean = false;
  private _reaction: IReactionDisposer | null = null;
  private _reactionStorage: IReactionDisposer | null = null;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _productsList: observable,
      _totalCartAmount: observable,
      _isAdded: observable,
      productsList: computed,
      totalCartAmount: computed,
      isAdded: computed,
      addProduct: action,
      clearCart: action,
      decrementProductById: action,
      incrementProductById: action,
      removeProductById: action,
      checkedCart: action,
    });
    this._restoreSessionFromStorage();

    this._initReaction();
    this._saveLocaleStorage();
  }

  get productsList(): ProductsCart[] {
    return this._productsList;
  }

  get totalCartAmount(): number {
    return this._totalCartAmount;
  }

  get isAdded(): boolean {
    return this._isAdded;
  }

  addProduct(product: ProductModel): void {
    const selectedProduct: ProductsCart = {
      id: product.id,
      title: product.title,
      count: 1,
      imgUrl: product.urlImage,
      price: product.price,
      sum: product.price,
    };

    const haveProduct = this._productsList.some((item) => item.id === selectedProduct.id);

    if (haveProduct) {
      this._productsList = this._productsList.map((item) => {
        if (item.id === selectedProduct.id) {
          return { ...item, sum: item.sum + item.price, count: item.count + 1 };
        }

        return item;
      });
    } else {
      const newProduct = { ...selectedProduct, count: 1, sum: selectedProduct.price };
      this._productsList = [...this._productsList, newProduct];
    }

    this._totalCartAmount += selectedProduct.price;
  }

  removeProductById(idProduct: string): void {
    const selectProduct = this._productsList.find((item) => item.id === idProduct);

    this._productsList = this._productsList.filter((item) => item.id !== idProduct);

    if (selectProduct) {
      this._totalCartAmount -= selectProduct?.sum;
    }
  }

  incrementProductById(id: string): void {
    this._productsList = this._productsList.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1, sum: item.sum + item.price };
      }

      return item;
    });

    const selectProduct = this._productsList.find((item) => item.id === id);

    if (selectProduct) {
      this._totalCartAmount += selectProduct.price;
    }
  }

  decrementProductById(id: string): void {
    this._productsList = this._productsList.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count - 1, sum: item.sum - item.price };
      }

      return item;
    });

    const selectProduct = this._productsList.find((item) => item.id === id);

    if (selectProduct) {
      this._totalCartAmount -= selectProduct.price;
    }
  }

  clearCart(): void {
    this._totalCartAmount = 0;
    this._productsList = [];
  }

  checkedCart(): void {
    this._isAdded = false;
  }

  destroy(): void {
    if (this._reaction) {
      this._reaction();
    }

    if (this._reactionStorage) {
      this._reactionStorage();
    }
  }

  private _initReaction(): void {
    this._reaction = reaction(
      () => this._productsList.length,
      (next, prev) => {
        if (next > prev) {
          this._isAdded = true;
        }
      },
    );
  }

  private _saveLocaleStorage(): void {
    this._reactionStorage = reaction(
      () => this._productsList,
      () => {
        localStorage.setItem('cart', JSON.stringify(this._productsList));
        localStorage.setItem('amount', JSON.stringify(this._totalCartAmount));
      },
    );
  }

  private _restoreSessionFromStorage(): void {
    const productsCart = localStorage.getItem('cart');
    const amount = localStorage.getItem('amount');
    if (productsCart && amount) {
      this._productsList = JSON.parse(productsCart);
      this._totalCartAmount = JSON.parse(amount);
    }
  }
}
