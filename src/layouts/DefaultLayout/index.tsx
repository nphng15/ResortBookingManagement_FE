
import { Outlet } from "react-router-dom";
import Navbar from "../DefaultLayout/components/Navbar";
import Footer from "../DefaultLayout/components/Footer";

function DefaultLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default DefaultLayout
