import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/hooks/useLocalStore';

type Field = {
  value: string;
  errorMessage: string;
};

type PrivateFields = '_addressField' | '_phoneField';

export class OrderFormStore implements ILocalStore {
  private _phoneField: Field = {
    value: '',
    errorMessage: '',
  };

  private _addressField: Field = {
    value: '',
    errorMessage: '',
  };

  constructor() {
    makeObservable<OrderFormStore, PrivateFields>(this, {
      _phoneField: observable,
      _addressField: observable,
      phone: computed,
      address: computed,
      validate: action,
      setAddress: action,
      setPhone: action,
    });
  }

  get phone(): Field {
    return this._phoneField;
  }

  get address(): Field {
    return this._addressField;
  }

  validate(): boolean {
    this._addressField.errorMessage = '';
    this._phoneField.errorMessage = '';

    if (this._phoneField.value.trim() === '') {
      this._phoneField.errorMessage = 'Некорректно заполнено поле "телефон';
      return false;
    }

    if (this._addressField.value.trim() === '') {
      this._addressField.errorMessage = 'Некорректно заполнено поле "адрес"';
      return false;
    }

    return true;
  }

  setPhone(value: string): void {
    this._phoneField.value = value;
  }

  setAddress(value: string): void {
    this._addressField.value = value;
  }

  destroy(): void {}
}
