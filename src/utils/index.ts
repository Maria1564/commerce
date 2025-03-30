/* eslint-disable no-unused-vars */
type typeUpdateQueryParams = (navigate: (str: string)=>void, params: {[key: string]: string}) => void

//добовляет квере параметры в url
export const updateQueryParams: typeUpdateQueryParams  = (navigate, params) => {
    const newParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach((item) => {
      newParams.set(item[0], item[1]);
    });

    navigate(`?${newParams.toString()}`);
}