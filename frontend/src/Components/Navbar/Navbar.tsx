import logo from './stock.png';

interface Props { }

const Navbar = (props: Props) => {
    return (
        <nav className='container relative mx-auto p-6'>
            <div className='flex items-center justify-between'>
                {/* Dashboard and Logo */}
                <div className='flex items-center space-x-12'>
                    <img className='w-32' alt="logo" src={logo}/>
                    <div className='font-semiBold flex'>
                        <a href='' className='text-black hover:opacity-40 text-lg flex'>
                            Dashboard
                        </a>
                    </div>
                </div>

                {/* Login Signup */}
                <div className='hidden md:flex items-center space-x-8 text-black'>
                    <div className='hover:cursor-pointer hover: hover:opacity-40'>Login</div>
                    <a href='' className='bg-dark px-2 py-1.5 rounded-lg text-white hover:opacity-40'>Signup</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar