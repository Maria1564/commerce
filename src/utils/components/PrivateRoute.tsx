import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router';
import { Routes } from 'config/routes';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = observer(({ children }) => {
  const { auth } = useRootStoreContext();
    
  if (!auth.isAuth) {
    return <Navigate to={Routes.login} replace />;
  }
  return <> {children} </>;
});
