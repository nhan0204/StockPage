import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/stock.png';

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <nav className='container relative mx-auto p-6'>
            <div className='flex items-center justify-between'>
                {/* Dashboard and Logo */}
                <div className='flex items-center space-x-6 lg:space-x-12'>
                    <Link to="/">
                        <img className='w-20 lg:w-32' alt="logo" src={logo}/>
                    </Link>
                    <div className='font-semiBold'>
                        <Link to="/search" className='text-lg lg:text-xl text-black hover:opacity-40 flex'>
                            Search
                        </Link>
                    </div>
                </div>

                {/* Login Signup */}
                <div className='flex flex-row items-center space-x-6 lg:space-x-8 text-black'>
                    <Link to="/login">
                        <button className='hover:cursor-pointer hover: hover:opacity-40'>Login</button>
                    </Link>
                    <Link to="/register">
                        <button className='bg-dark px-2 py-1.5 rounded-lg text-white hover:opacity-40'>Signup</button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar