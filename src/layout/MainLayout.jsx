import { Outlet } from "react-router-dom";
import Navber from "../components/Navber";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div className="container mx-auto">
            <Navber></Navber>
            <Outlet></Outlet>
            <div className="bg-[#eafcfa]">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;