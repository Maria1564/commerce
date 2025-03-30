import { Navigate, RouteObject } from "react-router";

import AboutUsPage from "app/pages/AboutUsPage";
import CatalogPage from "app/pages/CatalogPage";
import NotFoundPage from "app/pages/NotFoundPage";
import ProductPage from "app/pages/ProductPage";
import { Routes } from "types/index";
import App from "../app/App";

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
                element: <ProductPage/>
            },
            {
                path: Routes.about,
                element: <AboutUsPage/>
            }
            
        ]
    },
    {
        path:Routes.other,
        element: <NotFoundPage/>
    }
]