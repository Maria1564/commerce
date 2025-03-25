import React from 'react'
import { Outlet } from 'react-router'
import Navbar from 'layout/Navbar'
import style from "./Layout.module.scss"


const Layout:React.FC = () => {
  return (
    <div className={style.container}>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout