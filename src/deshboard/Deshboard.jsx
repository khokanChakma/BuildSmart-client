import { FaHome } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
import Navber from "../components/Navber";
import { MdHistory, MdManageAccounts, MdOutlinePayment } from "react-icons/md";
import { RiCoupon2Line, RiProfileFill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

const Deshboard = () => {
    const isAdmin = true;
    const isMember = true;
    return (
        <div>
            <Navber></Navber>
            <div className="md:flex gap-12">
                <div className="w-64 min-h-screen">
                    <ul className="menu p-4">
                        {
                            isMember ?
                                <>
                                    <li>
                                        <NavLink to="/deshboard/myProfile">
                                            <FaHome></FaHome>
                                            My Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/deshboard/makePayment">
                                            <MdOutlinePayment />
                                            Make payment</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/deshboard/paymentHistory">
                                            <MdHistory />
                                            Payment History</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/deshboard/announcements">
                                            <GrAnnounce />
                                            Announcements</NavLink>
                                    </li>
                                </>
                                :
                                <>
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
                                </>
                        }
                        {
                            isAdmin && <>
                                <li>
                                    <NavLink to="/deshboard/adminProfile">
                                        <RiProfileFill />
                                        Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/deshboard/manageMembers">
                                        <MdManageAccounts />
                                        Manage Members</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/deshboard/makeAnnouncement">
                                        <TfiAnnouncement />
                                        Make Announcement</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/deshboard/agreementRequest">
                                        <VscGitPullRequestGoToChanges />
                                        Agreement Requests</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/deshboard/manageCoupons">
                                        <RiCoupon2Line />
                                        Manage Coupons</NavLink>
                                </li>
                            </>
                        }

                    </ul>
                </div>
                <div className="bg-red-50 w-full">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Deshboard;