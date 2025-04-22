import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_favorites' | '_loadFromLocalStorage';

export class FavoritesStore {
  private _favorites: Set<string> = new Set<string>();

  constructor() {
    makeObservable<FavoritesStore, PrivateFields>(this, {
      _favorites: observable,
      favorites: computed,
      _loadFromLocalStorage: action,
      toggle: action,
    });

    this._loadFromLocalStorage();
  }

  get favorites(): Set<string> {
    return this._favorites;
  }

  private _loadFromLocalStorage(): void {
    const saved = localStorage.getItem('favorites');

    if (saved) {
      this._favorites = new Set(JSON.parse(saved));
    }
  }

  toggle(idProduct: string): void {
    if (this._favorites.has(idProduct)) {
      this._favorites.delete(idProduct);
    } else {
      this._favorites.add(idProduct);
    }

    localStorage.setItem('favorites', JSON.stringify(this._favorites));
  }

  isFavorite(idProduct: string): boolean {
    return this._favorites.has(idProduct);
  }
}
