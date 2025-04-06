import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/hooks/useLocalStore';

export type Option = {
  value: string;
  text: string;
};

type PrivateFields = '_selectOption';

export class SortOptionsStore implements ILocalStore {
  private _optionslist: Option[] = [
    {
      value: '',
      text: 'по популярности',
    },
    {
      value: 'price',
      text: 'сначала дешёвые',
    },
    {
      value: 'price:desc',
      text: 'сначала дорогие',
    },
    {
      value: 'publishedAt',
      text: 'сначала старые',
    },
    {
      value: 'publishedAt:desc',
      text: 'сначала новые',
    },
  ];

  private _selectOption: string = '';

  constructor() {
    this._selectOption = this._optionslist[0].value;

    makeObservable<SortOptionsStore, PrivateFields>(this, {
      _selectOption: observable,
      selectedNameOption: computed,
      updateSelectedNameOption: action,
    });
  }

  get listOptions(): Option[] {
    return this._optionslist;
  }

  get selectedNameOption(): string {
    return this._selectOption;
  }

  updateSelectedNameOption(selectedOptionValue: string | undefined): void {
    this._selectOption = this._optionslist.find((item) => {
      if (selectedOptionValue) {
        return item.value === selectedOptionValue;
      } else {
        return item.value === '';
      }
    })?.text!;
  }

  destroy() {}
}
