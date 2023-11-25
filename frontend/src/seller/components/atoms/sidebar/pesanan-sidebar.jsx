import React, { useState } from 'react'
import { Icon } from '@iconify/react';

function PesananSidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div >
            <div className='py-1 text-white'>
                <div id='' className='flex justify-between w-full  py-3 md:gap-0 md:flex-wrap  items-center border-b-[1px] border-white transition-border duration-300'>
                    <div className='flex items-center gap-3'>
                        <Icon icon="line-md:text-box-multiple-twotone" className='text-xs md:text-base' />
                        <div className=''>
                            <h1 className='font-bold text-xs md:text-base'>Pesanan</h1>
                        </div>
                    </div>
                    <button onClick={toggleDropdown}
                        className={`transition-transform duration-300 transform ${isOpen ? 'rotate-90' : ''}`}>
                        <Icon
                            className="items-end"
                            icon="line-md:chevron-down" rotate={3} hFlip={true}
                        />
                    </button>
                    <div className={`ml-8 w-full transition-all duration-300 overflow-hidden 
                ${isOpen ? 'opacity-100 py-4 max-h-[100vh] translate-y-2 ' : 'opacity-0 max-h-0 -translate-y-2'}`}>
                        <p className='pb-2 transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>
                            Pesanan Masuk</p>
                        <p className='pb-2 transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>
                            Pesanan Diproses</p>
                        <p className='pb-2 transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>
                            Pesanan Selesai</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PesananSidebar
