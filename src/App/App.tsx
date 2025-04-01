import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import './App.scss';
import Navbar from 'layout/Navbar';
import { useQueryContext } from './provider/QueryContext';

function App() {
  const { values, updaterQueryParams } = useQueryContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.size === 0) {
      updaterQueryParams({ page: '1' });
      return;
    }

    for (const [paramName, paramValue] of searchParams.entries()) {
      updaterQueryParams({ [paramName]: paramValue });
    }
  }, []);

  useEffect(() => {}, [values]);
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
