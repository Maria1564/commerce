// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';

import './index.scss';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router';
import { Routes } from 'config/routes';
import { RootStoreProvider } from 'store/RootStore/rootStoreProvider';
import App from './App';
import AboutUsPage from './pages/AboutUsPage';
import CatalogPage from './pages/CatalogPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import 'config/configureMobX';

export const routeConfig: RouteObject[] = [
  {
    path: Routes.main,
    element: (
      <RootStoreProvider>
        <App />
      </RootStoreProvider>
    ),

    children: [
      {
        index: true,
        element: <Navigate to={Routes.catalog} replace />,
      },
      {
        path: Routes.catalog,
        element: <CatalogPage />,
      },
      {
        path: Routes.productById,
        element: <ProductPage />,
      },
      {
        path: Routes.about,
        element: <AboutUsPage />,
      },
    ],
  },
  {
    path: Routes.other,
    element: <NotFoundPage />,
  },
];
const router = createBrowserRouter(routeConfig);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
