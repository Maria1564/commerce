import { Navigate, RouteObject } from "react-router";

import CatalogPage from "App/pages/CatalogPage";
import { Routes } from "types/index";
import App from "../App/App";

export const routeConfig: RouteObject[] = [
    {
        path: Routes.main,
        element: <App/>,

        children: [
            {
                index: true,
                element: <Navigate to={Routes.catalog} replace/>
            },
            {
                path: Routes.catalog,
                element:  <CatalogPage/>
            },
            {
                path: Routes.productById,
                element: <></>
            }
        ]
    }
]