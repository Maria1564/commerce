// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router';
import { Routes } from 'config/routes';
import { RootStoreProvider } from 'store/RootStore/rootStoreProvider';
import PrivateRoute from 'utils/components/PrivateRoute';
import PublicRoute from 'utils/components/PublicRoute';
import App from './App';
import AboutUsPage from './pages/AboutUsPage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
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
        element: (
          <PrivateRoute>
            <CatalogPage />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.productById,
        element: (
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.about,
        element: (
          <PrivateRoute>
            <AboutUsPage />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.register,
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
      {
        path: Routes.login,
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
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
