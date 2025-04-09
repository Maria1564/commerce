import { AuthStore } from './AuthStore/AuthStore';
import { QueryParamsStore } from './QueryParamsStore/QueryParamsStore';
import { ThemeStore } from './ThemeStore/ThemeStore';

export default class RootStore {
  readonly queryParams = new QueryParamsStore();
  readonly auth = new AuthStore();
  readonly theme = new ThemeStore();
}
