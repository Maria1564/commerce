// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router';
import 'config/configureMobX';
import { routeConfig } from './routerProvider.';

const router = createBrowserRouter(routeConfig);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
