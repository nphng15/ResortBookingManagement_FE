
import { Outlet } from "react-router-dom";
import Navbar from "../DefaultLayout/components/Navbar";
import Footer from "../DefaultLayout/components/Footer";

function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default DefaultLayout
