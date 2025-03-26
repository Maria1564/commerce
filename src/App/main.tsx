// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routeConfig } from 'config/routes'

const router = createBrowserRouter(routeConfig)

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
