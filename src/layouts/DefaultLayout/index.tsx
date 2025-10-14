
import { Outlet } from "react-router-dom";
import BasicMenu from "../../pages/components/Navbar";

function DefaultLayout() {
  return (
    <>
      <BasicMenu/>
      <Outlet/>
    </>
  )
}

export default DefaultLayout
