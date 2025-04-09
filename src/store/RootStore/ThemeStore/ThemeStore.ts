import { action, computed, makeObservable, observable } from 'mobx';

type LightOrDark = 'light' | 'dark';
type PrivateFields = '_currentTheme' | '_setTheme';

export class ThemeStore {
  private _currentTheme: LightOrDark = 'light';

  constructor() {
    makeObservable<ThemeStore, PrivateFields>(this, {
      _currentTheme: observable,
      currentTheme: computed,
      _setTheme: action,
    });

    this._loadTheme();
  }

  get currentTheme(): LightOrDark {
    return this._currentTheme;
  }

  private _loadTheme(): void {
    const theme = localStorage.getItem('theme') as LightOrDark;

    if (theme) {
      this._setTheme(theme);
    }
  }

  private _setTheme(theme: LightOrDark): void {
    this._currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme(): void {
    const newCurrentTheme = this._currentTheme === 'light' ? 'dark' : 'light';
    this._setTheme(newCurrentTheme);
  }
}
