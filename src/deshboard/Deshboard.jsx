import { FaHome } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
import Navber from "../components/Navber";

const Deshboard = () => {
    return (
        <div>
            <Navber></Navber>
            <div className="flex">
                <div className="w-64 min-h-screen">
                    <ul className="menu p-4">
                        <li>
                            <NavLink to="/deshboard/myProfile">
                                <FaHome></FaHome>
                                My Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/deshboard/announcements">
                                <GrAnnounce />
                                Announcements</NavLink>
                        </li>

                        <div className="divider"></div>

                        <li>
                            <NavLink to="/deshboard/makePayment">
                                <GrAnnounce />
                                Make payment</NavLink>
                        </li>
                        <li>
                            <NavLink to="/deshboard/paymentHistory">
                                <GrAnnounce />
                                Payment History</NavLink>
                        </li>

                    </ul>
                </div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Deshboard;