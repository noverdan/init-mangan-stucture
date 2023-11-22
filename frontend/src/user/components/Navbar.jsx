import LocalButton from './Button'
import LogoMangan from '/logo-mangan.svg'
import React, { useEffect } from 'react';


function Navbar() {

    return (
        <header className='flex justify-between items-center px-20 w-full shadow-md h-20 bg-white fixed top-0 z-20'>
            <nav className='flex gap-28 h-full items-center'>
                <img src={LogoMangan} alt="" width={120} />
                <div className='flex gap-8 '>
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
            <div className='flex gap-4 items-center'>
                <a href="" className='font-semibold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Daftar</a>
                <LocalButton name="Masuk" />
            </div>
        </header>
    )
}
export default Navbar