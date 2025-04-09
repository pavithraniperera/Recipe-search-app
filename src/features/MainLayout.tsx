
import {Outlet} from "react-router-dom";
import Navbar from "../components/Nabar.tsx";
export  function MainLayout() {


    return (
        <section >
            <Navbar />
            <Outlet/>
        </section>
    )
}