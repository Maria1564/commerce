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
  discountedPrice: number;
};

type PrivateFields =
  | '_productsList'
  | '_totalCartAmount'
  | '_isAdded'
  | '_restoreSessionFromStorage'
  | '_totalDiscountedAmount';

export class CartStore implements ILocalStore {
  private _productsList: ProductsCart[] = [];
  private _totalCartAmount: number = 0;
  private _isAdded: boolean = false;
  private _reaction: IReactionDisposer | null = null;
  private _reactionStorage: IReactionDisposer | null = null;
  private _totalDiscountedAmount: number = 0;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _productsList: observable,
      _totalCartAmount: observable,
      _isAdded: observable,
      _totalDiscountedAmount: observable,
      productsList: computed,
      totalCartAmount: computed,
      isAdded: computed,
      addProduct: action,
      clearCart: action,
      decrementProductById: action,
      incrementProductById: action,
      removeProductById: action,
      checkedCart: action,
      addProductsFromOrder: action,
      _restoreSessionFromStorage: action,
      totalDiscountedAmount: computed,
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

  get totalDiscountedAmount(): number {
    return this._totalDiscountedAmount;
  }

  addProduct(product: ProductModel | ProductsCart): void {
    let selectedProduct: ProductsCart;
    if ('urlImage' in product) {
      selectedProduct = {
        id: product.id,
        title: product.title,
        count: 1,
        imgUrl: product.urlImage,
        price: product.price,
        sum: product.price,
        discountedPrice: product.discountedPrice,
      };
    } else {
      selectedProduct = product;
    }

    const haveProduct = this._productsList.some((item) => item.id === selectedProduct.id);

    if (haveProduct) {
      this._productsList = this._productsList.map((item) => {
        if (item.id === selectedProduct.id) {
          return {
            ...item,
            sum: Number((item.sum + (item.discountedPrice ? item.discountedPrice : item.price))),
            count: item.count + 1,
          };
        }

        return item;
      });
    } else {
      const newProduct = {
        ...selectedProduct,
        count: 1,
        sum: product.discountedPrice ? product.discountedPrice : product.price,
      };
      this._productsList = [...this._productsList, newProduct];
    }
    this._totalCartAmount += selectedProduct.price;

    const selectProduct = this._productsList.find((item) => item.id === product.id);

    if (selectProduct) {
      const currentPrice: number = selectProduct.discountedPrice || selectProduct.price;
      this._totalDiscountedAmount = Number((this._totalDiscountedAmount + currentPrice));
    }
  }

  removeProductById(idProduct: string): void {
    const selectProduct = this._productsList.find((item) => item.id === idProduct);

    this._productsList = this._productsList.filter((item) => item.id !== idProduct);
    if (selectProduct) {
      const currentPrice: number = selectProduct.discountedPrice || selectProduct.price;

      this._totalDiscountedAmount = Number(
        (this._totalDiscountedAmount - currentPrice * selectProduct.count),
      );
      const sumPrice = selectProduct.price * selectProduct.count;
      this._totalCartAmount -= sumPrice;
    }
  }

  incrementProductById(id: string): void {
    this._productsList = this._productsList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          count: item.count + 1,
          sum: Number((item.sum + (item.discountedPrice ? item.discountedPrice : item.price))),
        };
      }
      return item;
    });

    const selectProduct = this._productsList.find((item) => item.id === id);

    if (selectProduct) {
      const currentPrice: number = selectProduct.discountedPrice || selectProduct.price;

      this._totalCartAmount += selectProduct.price;
      this._totalDiscountedAmount = Number((this._totalDiscountedAmount + currentPrice));
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
      const currentPrice: number = selectProduct.discountedPrice || selectProduct.price;
      this._totalCartAmount -= selectProduct.price;
      this._totalDiscountedAmount = Number((this._totalDiscountedAmount - currentPrice));
    }
  }

  clearCart(): void {
    this._totalCartAmount = 0;
    this._totalDiscountedAmount = 0;
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

  addProductsFromOrder(orderProducts: ProductsCart[]): void {
    orderProducts.forEach((product) => {
      this.addProduct(product);
    });
    this._isAdded = true;
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
        localStorage.setItem('amountDiscountedPrice', JSON.stringify(this._totalDiscountedAmount));
      },
    );
  }

  private _restoreSessionFromStorage(): void {
    const productsCart = localStorage.getItem('cart');
    const amount = localStorage.getItem('amount');
    const amountDiscountedPrice = localStorage.getItem('amountDiscountedPrice');
    if (productsCart && amount && amountDiscountedPrice) {
      this._productsList = JSON.parse(productsCart);
      this._totalCartAmount = JSON.parse(amount);
      this._totalDiscountedAmount = JSON.parse(amountDiscountedPrice);
    }
  }
}
