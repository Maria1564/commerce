import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router';
import './App.scss';
import Navbar from 'layout/Navbar';
import { useQueryParamsInit } from 'store/RootStore/hooks/useQueryParamsInit';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';

function App() {
  useQueryParamsInit();
  const rootStore = useRootStoreContext();

  if (rootStore === null) {
    return;
  }

  return (
    <div>
      {rootStore.auth.isAuth && <Navbar />}
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default observer(App);
