import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/stock.png';
import { useAuth } from '../../Context/useAuth';

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
    const { isLoggedIn, logoutUser, user } = useAuth();


    return (
        <nav className='container relative mx-auto p-6'>
            <div className='flex items-center justify-between'>
                {/* Dashboard and Logo */}
                <div className='flex items-center space-x-6 lg:space-x-12'>
                    <Link to="/">
                        <img className='w-20 lg:w-32' alt="logo" src={logo} />
                    </Link>
                    <div className='font-semiBold hidden lg:flex'>
                        <Link to="/search" className='text-lg lg:text-xl text-black hover:opacity-40 flex'>
                            Search
                        </Link>
                    </div>
                </div>

                {
                    isLoggedIn() ? (
                        <>
                            {/* Welcome Logout */}
                            <div className='flex flex-row items-center space-x-6 lg:space-x-8 text-black'>
                                <div className='flex flex-row items-center gap-2  hover:cursor-pointer hover: hover:opacity-40 text-sm lg:text-lg text-right'>
                                    <i className='bx bx-user text-xl lg:text-3xl'></i>
                                    <span>{user?.userName}</span>
                                </div>
                                <Link to={"/login"} onClick={logoutUser} className='bg-dark px-2 py-1.5 rounded-lg text-white hover:opacity-40'>Logout</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Login Signup */}
                            <div className='flex flex-row items-center space-x-4 lg:space-x-8 text-black'>
                                <Link to="/login" className='hover:cursor-pointer hover: hover:opacity-40'>Login</Link>
                                <Link to="/register" className='bg-dark px-2 py-1.5 rounded-lg text-white hover:opacity-40'>Signup</Link>
                            </div>
                        </>
                    )
                }

            </div>
        </nav>
    )
}

export default Navbar;