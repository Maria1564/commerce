// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.scss';
import 'config/configureMobX';
import { createHashRouter, RouterProvider } from 'react-router';
import { routeConfig } from './routerProvider.';

const router = createHashRouter(routeConfig);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
