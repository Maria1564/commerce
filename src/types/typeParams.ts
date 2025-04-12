export type RequestParams = {
  populate?: string |  string[];
  pagination?: {
    pageSize: number;
    page: number;
  };
  filters?: {
    title?: {
      $containsi: string;
    };
    productCategory?: {
      title: {
        $containsi: string[];
      };
    };
  };
  sort?: string;
  fields?: string[];
};
