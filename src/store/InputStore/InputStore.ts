import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/hooks/useLocalStore';

type PrivateFields = '_value';

export class InputStore implements ILocalStore {
  private _value: string = '';

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _value: observable,
      value: computed,
      setValue: action,
    });
  }

  get value(): string {
    return this._value;
  }

  setValue(newValue: string): void {
    this._value = newValue;
  }

  destroy(): void {}
}
