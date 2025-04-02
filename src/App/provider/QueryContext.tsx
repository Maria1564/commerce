// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { useNavigate, useSearchParams } from "react-router";

import React, { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router';

// type typeQueryContext = {
//   params: { [key: string]: string };
//   changeParamByKey: (value: string, key: string) => void;
// };

// export const queryContext = createContext<null | typeQueryContext>(null);

// type QueryProviderProps = {
//   children: React.ReactNode;
// };

// const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const initialParams = {
//     page: searchParams.get("page") || "1",
//     ...(searchParams.get("search") && { search: searchParams.get("search")! }),
//     ...(searchParams.get("category") && {
//       category: searchParams.get("category")!,
//     }),
//     ...(searchParams.get("sort") && { sort: searchParams.get("sort")! }),
//   };

//   const [params, setParams] = useState<{ [key: string]: string }>(
//     initialParams,
//   );

//   const changeParamByKey = useCallback(
//     (key: string, value: string) => {
//       const newParams = new URLSearchParams(window.location.search);

//       if (value.trim() === "") {
//         setParams((prev) => {
//           const { [key]: _, ...otherKey } = prev;
//           return otherKey;
//         });

//         newParams.delete(key);
//       } else {
//         setParams((prev) => ({
//           ...prev,
//           [key]: value,
//         }));

//         newParams.set(key, value);
//       }

//       navigate(`?${newParams.toString()}`);
//     },
//     [searchParams, navigate],
//   );

//   //добавление параметров при инициализации
//   useEffect(() => {
//     // updateQueryParams(navigate, params);
//   }, []);

//   const value: typeQueryContext = {
//     params,
//     changeParamByKey,
//   };

//   return (
//     <queryContext.Provider value={value}>{children}</queryContext.Provider>
//   );
// };

// export const useQueryContext = () => useContext(queryContext);

// export default QueryProvider;

type QueryParamsStateValue = {
  [key: string]: string;
};

type ContextType = {
  values: QueryParamsStateValue;
  updaterQueryParams: (value: QueryParamsStateValue) => void;
};

const QueryParamsStoreContext = createContext<ContextType>({
  values: {},
  updaterQueryParams: () => {},
});

type QueryProviderProps = {
  children: React.ReactNode;
};

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [_, setSearchParams] = useSearchParams();

  const [values, setValues] = useState<QueryParamsStateValue>({});

  const updaterQueryParams = (param: QueryParamsStateValue) => {
    const newParams = new URLSearchParams(window.location.search);
    const newObjParams: QueryParamsStateValue = {};

    const key = Object.keys(param)[0];
    const value = Object.values(param)[0];

    if (value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);

    for (const [paramName, paramValue] of newParams.entries()) {
      newObjParams[paramName] = paramValue;
    }

    setValues(newObjParams);
  };

  return (
    <QueryParamsStoreContext.Provider value={{ values, updaterQueryParams }}>
      {children}
    </QueryParamsStoreContext.Provider>
  );
};

export const useQueryContext = () => useContext(QueryParamsStoreContext);
