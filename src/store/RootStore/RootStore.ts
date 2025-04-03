import { QueryParamsStore } from './QueryParamsStore/QueryParamsStore';

export default class RootStore {
  readonly queryParams = new QueryParamsStore();
}
