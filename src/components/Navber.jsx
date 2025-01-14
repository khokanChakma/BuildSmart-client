import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../provider/AuthContext';

const Navber = () => {

    const { user, logOut } = useContext(AuthContext);

    const links = <>
        <NavLink to='/'> <li><a>Home</a></li></NavLink>
        <NavLink to='/apartments'> <li><a>Apartment</a></li></NavLink>
    </>
    return (
        <div className='container mx-auto'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">BuildSmart</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user && user?.email ?
                            <div className="flex justify-center items-center gap-4 z-10">
                               
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className="m-1">
                                        <img id="showTooltip" className="w-12 h-12 rounded-full cursor-pointer" src={user?.photoURL} alt="" />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a>{user?.displayName}</a></li>
                                        <Link><li><a>deshboard</a></li></Link>
                                        <Link onClick={logOut}><li><a>Logout</a></li></Link>
                                    </ul>
                                </div>
                            </div>
                            :
                            <div className="flex gap-4">
                                <Link to='/login'><button className="btn">Login</button></Link>
                                <Link to='/register'><button className="btn">Register</button></Link>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navber;