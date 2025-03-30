import { Outlet } from "react-router";
import "./App.scss";
import Navbar from "layout/Navbar";
import QueryProvider from "./provider/QueryContext";

function App() {
  return (
    <>
      <QueryProvider>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </QueryProvider>
    </>
  );
}

export default App;
