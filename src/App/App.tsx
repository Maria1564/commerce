import { Outlet } from 'react-router';
import './App.scss';
import Navbar from 'layout/Navbar';
import { useQueryParamsInit } from 'store/RootStore/hooks/useQueryParamsInit';

function App() {
  useQueryParamsInit();

  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
