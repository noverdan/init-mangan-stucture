import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';


function PaketSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (


        <div className='flex py-4 text-white flex-wrap  border-b-[1px] border-white transition-border duration-300'>
            {/* icon ,button dan text */}
            <div className='flex flex-grow gap-3  items-center justify-between'>
                <div className='flex items-center gap-1 md:gap-2'>
                    <Icon className='text-[10px] md:text-base' icon="line-md:edit-twotone-full" />
                    <h1 className='font-bold text-[9px] md:text-base'>Kelola</h1>
                </div>
                <button
                    onClick={toggleDropdown}
                    className={`transition-transform ml-1 items-end duration-300 transform ${isOpen ? 'rotate-90' : ''}`}>
                    <Icon
                        className="items-end"
                        icon="line-md:chevron-down" rotate={3} hFlip={true}
                    />
                </button>
            </div>
            <div className={`ml-3 flex flex-col w-full transition-all duration-300 
                    ${isOpen ? ' translate-y-1 py-4 opacity-100  max-h-[100vh]' : 'opacity-0 max-h-0 -translate-y-2'}`}>
                <NavLink to="/products" className='py-2 text-[10px] md:text-base transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>Tambah Produk</NavLink>
                <NavLink to="/list-products" className='py-2 text-[10px] md:text-base transition-colors duration-300  hover:font-bold cursor-pointer'>
                    List Produk
                </NavLink>
            </div>
        </div>


    )
}

export default PaketSidebar
