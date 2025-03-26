import { Outlet } from "react-router";
import "./App.scss"
import Navbar from "layout/Navbar";

function App() {
  return (
    <>
    <Navbar/>
    <div className="container">
      <Outlet/>
    </div>
    </>
  )
}

export default App;
