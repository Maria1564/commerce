type PaginationParams = {
  pageSize: number;
  page: number;
};

type FilterOperator = {
  [key: string]: string | string[] | number | boolean;
};

type Filters = {
  [field: string]: FilterOperator | Filters;
};

export type ParamsType = {
  fields?: string[]
  populate?: string[] | string;
  pagination?: PaginationParams;
  sort?: string;
  filters?: Filters;
  [key: string]: unknown;
};