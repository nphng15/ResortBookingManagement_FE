import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "../pages/Homepage"
import DefaultLayout from "../layouts/DefaultLayout";

function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route element={<DefaultLayout/>}>
                    <Route path="/" element={<HomePage/>} />

                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;