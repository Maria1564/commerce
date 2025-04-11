import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router';
import './App.scss';
import Container from 'components/Container';
import Navbar from 'layout/Navbar';
import { useQueryParamsInit } from 'store/RootStore/hooks/useQueryParamsInit';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';

function App() {
  useQueryParamsInit();
  const rootStore = useRootStoreContext();

  return (
    <div>
      {rootStore.auth.isAuth && <Navbar />}
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default observer(App);
