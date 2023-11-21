import React, { useState } from 'react'
import { Icon } from '@iconify/react';

function PaketSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <div className='py-1 text-white'>
                <div id='profile' className='flex justify-between w-full py-4 flex-wrap items-center border-b-[1px] border-white transition-border duration-300'>
                    <div className='flex items-center gap-3'>
                        <Icon icon="line-md:edit-twotone-full" />
                        <div className=''>
                            <h1 className='font-bold text-base'>Kelola Paket/Produk</h1>
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
                        <p className='pb-2 transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>Tambah Produk</p>
                        <p className='pb-2 transition-colors duration-300  hover:font-bold cursor-pointer border-b-[1px] border-white'>List Produk</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaketSidebar
