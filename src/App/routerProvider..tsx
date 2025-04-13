import { RouteObject, Navigate } from 'react-router';
import { Routes } from 'config/routes';
import { AboutUsPage } from 'pages/AboutUsPage';
import { CartPage } from 'pages/CartPage';
import { CatalogPage } from 'pages/CatalogPage';
import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProductPage } from 'pages/ProductPage';
import { RegisterPage } from 'pages/RegisterPage';
import { CatalogPageProvider } from 'store/CatalogPageStore/CatalogPageProvider';
import { ProductPageProvider } from 'store/ProductPageStore/ProductsPageProvider';
import { RootStoreProvider } from 'store/RootStore/rootStoreProvider';
import { PrivateRoute } from 'utils/components/PrivateRoute';
import { PublicRoute } from 'utils/components/PublicRoute';
import App from './App';

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
            <CatalogPageProvider>
              <CatalogPage />
            </CatalogPageProvider>
          </PrivateRoute>
        ),
      },
      {
        path: Routes.productById,
        element: (
          <PrivateRoute>
            <ProductPageProvider>
              <ProductPage />
            </ProductPageProvider>
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
        path: Routes.cart,
        element: <CartPage />,
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
