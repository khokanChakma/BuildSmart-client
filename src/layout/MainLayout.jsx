import { Outlet } from "react-router-dom";
import Navber from "../components/Navber";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div>
            <div className="bg-[#eafcfa]">
            <Navber></Navber>
            </div>
            <Outlet></Outlet>
            <div className="bg-[#eafcfa]">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;