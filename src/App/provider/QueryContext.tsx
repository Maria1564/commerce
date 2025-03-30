/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router";
import { updateQueryParams } from "utils";

type typeQueryContext = {
  params: { [key: string]: string };
  changeParamByKey: (value: string, key: string) => void;
};

export const queryContext = createContext<null | typeQueryContext>(null);

type QueryProviderProps = {
  children: React.ReactNode;
};

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialParams = {
    page: searchParams.get("page") || "1",
    ...(searchParams.get("search") && { search: searchParams.get("search")!}),
    ...(searchParams.get("category") && {category: searchParams.get("category")!}),
    ...(searchParams.get("sort") && {sort: searchParams.get("sort")!})
  };

  const [params, setParams] = useState<{ [key: string]: string }>(
    initialParams
  );

  const changeParamByKey = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(window.location.search);

      if (value.trim() === "") {
        setParams((prev) => {
          const { [key]: selectKey, ...otherKey } = prev;
          return otherKey;
        });

        newParams.delete(key);
      } else {
        setParams((prev) => ({
          ...prev,
          [key]: value,
        }));

        newParams.set(key, value);
      }

      navigate(`?${newParams.toString()}`);
    },
    [searchParams, navigate]
  );

  //добавление параметров при инициализации
  useEffect(() => {
    updateQueryParams(navigate, params);
  }, []);

  const value: typeQueryContext = {
    params,
    changeParamByKey,
  };

  return (
    <queryContext.Provider value={value}>{children}</queryContext.Provider>
  );
};

export const useQueryContext = () => useContext(queryContext);

export default QueryProvider;
