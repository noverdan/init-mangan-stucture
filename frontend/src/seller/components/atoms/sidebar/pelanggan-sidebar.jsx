import React, { useState } from 'react'
import { Icon } from '@iconify/react';

function PelangganSidebar() {
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
                    <Icon className='text-[9px] md:text-base' icon="line-md:person-twotone" />
                    <h1 className='font-bold text-[9px]  md:text-base'>Pelanggan</h1>
                </div>
                {/* icon dan text */}
                <button onClick={toggleDropdown}
                    className={`transition-transform -ml-3  duration-300 transform ${isOpen ? 'rotate-90' : ''}`}>
                    <Icon
                        className="items-end"
                        icon="line-md:chevron-down" rotate={3} hFlip={true}
                    />
                </button>
            </div>
            {/* icon ,button dan text */}

            {/* dropdown */}
            <div className={`ml-3 w-full transition-all duration-300 overflow-hidden 
            ${isOpen ? 'opacity-100 py-4 max-h-[100vh] translate-y-2 ' : 'opacity-0 max-h-0 -translate-y-2'}`}>
                <p className='pb-2 text-[10px] md:text-base transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>
                    Chat</p>
                <p className='pb-2 text-[10px] md:text-base transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>
                    Ulasan</p>
            </div>
            {/* dropdown */}
        </div>



    )
}

export default PelangganSidebar
