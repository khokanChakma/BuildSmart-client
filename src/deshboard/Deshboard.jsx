import { FaHome } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
import Navber from "../components/Navber";
import { MdHistory, MdManageAccounts, MdOutlinePayment } from "react-icons/md";
import { RiCoupon2Line, RiProfileFill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import useAdmin from "../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../provider/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Footer from "../components/Footer";

const Deshboard = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const isAdmin = useAdmin();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data
        }
    });
    const memberData = users.filter(userData => userData.email === user?.email);

    const roleData = (memberData[0]);





    return (
        <div className="container mx-auto">
            <Navber></Navber>
            <div className="md:flex gap-12">
                <div className="md:w-3/12">
                    <ul className="menu p-4">
                        {
                            roleData?.role === 'member' ?
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

                                </>
                        }
                        {
                            roleData?.role === 'admin' ? <>
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
                                :
                                <></>
                        }
                        {
                            roleData?.role === 'user' ? <>
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
                                :
                                <>
                                </>
                        }

                    </ul>
                </div>
                <div className="bg-red-50 md:w-9/12">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="bg-[#eafcfa]">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Deshboard;