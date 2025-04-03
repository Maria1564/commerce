import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useRootStoreContext } from '../rootStoreProvider';

export const useQueryParamsInit = () => {
  const [searchParams] = useSearchParams();
  const rootStore = useRootStoreContext();

  useEffect(() => {
    if (searchParams.size) {
      for (const [paramKey, paramValue] of searchParams.entries()) {
        rootStore.queryParams.updateParam(paramKey, paramValue);
      }
    } else {
      rootStore.queryParams.updateParam('page', '1');
    }
  }, []);
};
