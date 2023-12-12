import Hamburger from 'hamburger-react';
import LocalButton from './Button'
import LogoMangan from '/logo-mangan.svg'
import React, { useEffect, useState } from 'react';


function Navbar() {
    const [isOpenMenu, setOpenMenu] = useState(false)

    function openMenu() {
        if (isOpenMenu) {
            setOpenMenu(false)
        } else if (!isOpenMenu) {
            setOpenMenu(true)
        }
    }

    return (
        <header className='bg-white w-full shadow-md h-20 fixed top-0 z-20'>
            <div className='flex justify-between w-[360px] lg:w-full lg:px-20 h-full items-center mx-auto relative'>
                <nav className='flex gap-28 h-full items-center'>
                    <img src={LogoMangan} alt="" width={120} />
                    <div className={isOpenMenu ? 'flex absolute lg:static top-24 w-1/2 shadow-lg lg:shadow-none lg:w-full right-0  gap-5 rounded lg:gap-8 bg-white p-4 pt-16 lg:p-0 flex-col lg:flex-row ' : 'hidden lg:flex absolute lg:static top-24 w-1/2 shadow-lg lg:shadow-none lg:w-full right-0  gap-5 rounded lg:gap-8 bg-white p-4 pt-16 lg:p-0 flex-col lg:flex-row'}>
                        <span>
                            <a href="/#home"
                                className='font-bold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Home</a>
                        </span>
                        <span>
                            <a href="/#about-us"
                                className='font-bold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Tentang Kami</a>
                        </span>
                        <span>
                            <a href="/#catering"
                                className='font-bold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Katering</a>
                        </span>
                        <span>
                            <a href="/#join"
                                className='font-bold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Bergabung</a>
                        </span>
                    </div>
                </nav>
                <div className='lg:hidden'>
                    <Hamburger onToggle={openMenu} color='#de283b' size={25} />
                </div>

                <div className={isOpenMenu ? 'absolute top-28 right-5 lg:static flex gap-4 items-center' : 'hidden lg:flex gap-4 items-center'}>
                    <a href="/register" className='font-semibold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Daftar</a>
                    <button><a className='px-4 py-1 bg-primary-100 rounded text-white font-medium hover:bg-opacity-75 active:bg-primary-100' href="/login">Login</a></button>
                </div>
            </div>
        </header>

    )
}
export default Navbar