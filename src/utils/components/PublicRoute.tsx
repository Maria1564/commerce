import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router';
import { Routes } from 'config/routes';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { auth } = useRootStoreContext();
  if (auth.isAuth) {
    return <Navigate to={Routes.catalog} replace />;
  }

  return <>{children}</>;
};

export default observer(PublicRoute);
