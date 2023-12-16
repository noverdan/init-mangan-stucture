import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

function PesananSidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='flex py-4 text-white flex-wrap  border-b-[1px] border-white transition-border duration-300'>
            {/* icon ,button dan text */}
            <div className='flex flex-grow gap-3  items-center justify-between'>
                {/* icon dan text */}
                <div className='flex items-center gap-1 md:gap-2'>
                    <Icon className='text-[9px] md:text-base' icon="line-md:text-box-multiple-twotone" />
                    <h1 className='font-bold text-[9px] md:text-base'>Pesanan</h1>
                </div>
                {/* icon dan text */}
                <button onClick={toggleDropdown}
                    className={`transition-transform -ml-1 duration-300 items-end transform ${isOpen ? 'rotate-90' : ''}`}>
                    <Icon
                        icon="line-md:chevron-down" rotate={3} hFlip={true}
                    />
                </button>
            </div>
            {/* icon ,button dan text */}

            {/* dropdown */}
            <div className={`ml-3 w-full transition-all duration-300 overflow-hidden 
                        ${isOpen ? 'opacity-100 py-4 max-h-[100vh] translate-y-1 ' : 'opacity-0 max-h-0 -translate-y-2'}`}>
                <NavLink to="/pesanan-masuk" className='py-2 text-[10px] md:text-base transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>
                    Pesanan Masuk</NavLink>
                <p className='py-2 text-[10px] md:text-base transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>
                    Pesanan Diproses</p>
                <p className='py-2 text-[10px] md:text-base transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>
                    Pesanan Selesai</p>
            </div>
            {/* dropdown */}
        </div>
    )
}

export default PesananSidebar
