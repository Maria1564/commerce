import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router';
import { Routes } from 'config/routes';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute: React.FC<PublicRouteProps> = observer(({ children }) => {
  const { auth } = useRootStoreContext();
  if (auth.isAuth) {
    return <Navigate to={Routes.catalog} replace />;
  }

  return <>{children}</>;
});


