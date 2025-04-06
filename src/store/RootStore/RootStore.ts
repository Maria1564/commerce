import { AuthStore } from './AuthStore/AuthStore';
import { QueryParamsStore } from './QueryParamsStore/QueryParamsStore';

export default class RootStore {
  readonly queryParams = new QueryParamsStore();
  readonly auth = new AuthStore()
}
