import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';
import { FormFields } from 'store/FormStore/FormStore';
import { normalizeUserApi, UserApi, UserModel } from 'store/models/auth/user';
import { apiClient } from 'utils/axiosConfig';
import { Meta } from 'utils/meta';

type PrivateFields = '_user' | '_isAuth' | '_meta' | '_restoreSessionFromStorage' | '_errorMessage';

export class AuthStore {
  private _user: UserModel | null = null;
  private _isAuth: boolean = false;
  private _meta: string = Meta.initial;
  private _errorMessage: string = '';

  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _user: observable,
      _isAuth: observable,
      _meta: observable,
      _errorMessage: observable,
      user: computed,
      isAuth: computed,
      _restoreSessionFromStorage: action,
      login: action,
      register: action,
      resetAuthState: action
    });

    this._restoreSessionFromStorage();
  }

  get user(): UserModel | null {
    return this._user;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  get meta(): string {
    return this._meta;
  }

  get errorMessage():string {
    return this._errorMessage
  }

  resetAuthState = (): void => {
      this._meta = Meta.initial;
      this._errorMessage = '';
  };

  private _restoreSessionFromStorage = () => {
    try {
      this._user = null;
      this._isAuth = false;
      const dataUser = localStorage.getItem('auth');

      if (dataUser) {
        const user = JSON.parse(dataUser);

        this._user = user;
        this._isAuth = true;
      }
    } catch {
      this._meta = Meta.error;
    }
  };

  login(email: string, password: string): void {
    this._meta = Meta.loading;
    this._user = null;
    this._isAuth = false;
    this._errorMessage = ""
    // localStorage.removeItem('auth');

    apiClient
      .post<{ user: UserApi }>(`/auth/local`, { identifier: email, password })
      .then(({ data }) => {
        runInAction(() => {
          this._user = normalizeUserApi(data.user);
          this._isAuth = true;
          this._meta = Meta.success;

          localStorage.setItem('auth', JSON.stringify(this._user));
        });
      })
      .catch((error) =>
        runInAction(() => {
          this._meta = Meta.error;
          this._errorMessage = error.response.data.error.message || 'Неизвестная ошибка';
          console.log(toJS(this._errorMessage))
        }),
      );
  }

  register(dataForm: FormFields): void {
    this._meta = Meta.loading;
    this._user = null;
    this._isAuth = false;
    this._errorMessage =""

    apiClient
      .post<{ user: UserApi }>(`/auth/local/register`, {
        username: dataForm.username,
        email: dataForm.email,
        password: dataForm.password,
      })
      .then(() => {
        runInAction(() => {
          this._meta = Meta.success;


          setTimeout(() => this._meta = Meta.initial, 1000)
        });
      })
      .catch((error) => {
        runInAction(() => {
          this._meta = Meta.error;
          this._errorMessage = error.response.data.error.message || 'Неизвестная ошибка';
        });
      });
  }
}
