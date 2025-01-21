import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <div>
            <footer className="justify-center items-center text-base-content p-6 mt-8 text-gray-500">
                <nav className='flex w-full flex-col space-y-2 justify-center items-center'>
                    <div className='flex gap-2 items-center'>
                        <div>
                            <Link to='/'><img className='w-16 h-16' src={logo} alt="" /></Link>
                        </div>
                        <h6 className="font-bold text-gray-500 text-2xl">The Blog Heaven</h6>
                    </div>
                    <div className='flex gap-4'>
                        <Link to='/'>Home</Link>
                        <Link>Contact</Link>
                    </div>
                    <h6 className="text-xl">Social</h6>
                    <div className="flex gap-4 text-3xl">
                        <div>
                            <Link target='_blank' to='https://www.facebook.com/khokan.chakma.59360'><FaFacebook /></Link>
                        </div>
                        <div>
                            <Link target='_blank' to='https://www.linkedin.com/in/khokan-chakma/'><BsLinkedin /></Link>
                        </div>
                        <div>
                            <Link target='_blank' to='https://github.com/khokanChakma'><FaGithub /></Link>
                        </div>
                    </div>
                </nav>
                <footer className="footer footer-center p-4">
                    <aside>
                        <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                    </aside>
                </footer>
            </footer>
        </div>
    );
};

export default Footer;