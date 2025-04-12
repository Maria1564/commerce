import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/hooks/useLocalStore';

export type FormFields = {
  username?: string;
  email: string;
  password: string;
};

type PrivateFields = '_isRegister' | '_fieldsForm' | '_errorMessage' | '_clearForm';

export class FormStore implements ILocalStore {
  private _isRegister: boolean = false;
  private _fieldsForm: FormFields = {
    username: '',
    email: '',
    password: '',
  };
  private _errorMessage: string = '';

  constructor() {
    makeObservable<FormStore, PrivateFields>(this, {
      _isRegister: observable,
      _fieldsForm: observable,
      _errorMessage: observable,
      username: computed,
      email: computed,
      password: computed,
      errorMessage: computed,
      isRegister: computed,
      setRegisterMode: action,
      setUsername: action,
      setEmail: action,
      setPassword: action,
      validate: action,
      _clearForm: action,
    });
  }

  get username(): string | undefined {
    return this._fieldsForm.username;
  }

  get email(): string {
    return this._fieldsForm.email;
  }

  get password(): string {
    return this._fieldsForm.password;
  }

  get isRegister(): boolean {
    return this._isRegister;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  private _clearForm(): void {
    this._fieldsForm = {
      username: '',
      email: '',
      password: '',
    };
  }

  setRegisterMode(isReg: boolean): void {
    this._isRegister = isReg;
  }

  validate(sendMessage: (data: FormFields) => void): void {
    if (
      this._fieldsForm.email.trim() === '' ||
      this._fieldsForm.password.trim() === '' ||
      (this._isRegister && this._fieldsForm.username!.trim() === '')
    ) {
      this._errorMessage = 'Некорректно введён логин/пароль';
    } else {
      this._errorMessage = '';
      sendMessage(this._fieldsForm);
      this._clearForm();
    }
  }

  setUsername(value: string): void {
    this._fieldsForm.username = value;
  }

  setEmail(value: string): void {
    this._fieldsForm.email = value;
  }

  setPassword(value: string): void {
    this._fieldsForm.password = value;
  }

  destroy(): void {}
}
