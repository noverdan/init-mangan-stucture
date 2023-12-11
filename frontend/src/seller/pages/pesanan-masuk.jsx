import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Hamburger from 'hamburger-react';
import Sidebar from '../components/sidebar';

function PesananMasuk() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className={`flex items-start bg-bg-300 h-screen  transition-all ease-in-out duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-1'}`}>
            <div className="flex  h-full">
                {isOpen && <Sidebar />}
                <button className='z-20 w-9 h-9 block rounded-full transition-colors ' onClick={toggleSidebar}>
                    <Hamburger size={20} easing="ease-in" color='black' toggled={isOpen} toggle={setIsOpen} />
                </button>
            </div>
            <div className='flex flex-col'>
                <div className=' '>
                    <div className=' md:gap-[800px] gap-40 items-center  flex mt-[10px]'>
                        <h1 className='text-accent-200 font-semibold text-lg'>Keuangan</h1>
                        <button className='flex items-center gap-1 text-accent-200 font-semibold text-lg'>
                            <p>user view</p>
                            <Icon icon="line-md:clipboard-arrow-twotone" />
                        </button>
                    </div>
                </div>

                <div className='flex  md:w-full gap-44 mt-8 bg-white p-6 rounded-xl shadow-xl '>
                    <div className='flex gap-2'>
                        <div className='w-32 h-32 shadow-xl bg-slate-950 rounded-[10px]  overflow-hidden'>
                            <img src='' alt="Uploaded" className="w-full h-full object-cover" />
                        </div>
                        <div className='space-y-4'>
                            <h1 className='font-semibold text-accent-200'>Paket Nasi Box Bakaran</h1>
                            <div className='font-medium'>
                                <p>Menu A</p>
                                <p>150 porsi</p>
                            </div>
                            <h1 className='font-semibold'> <span className='text-accent-200'>Total:</span> Rp 1.000.000</h1>
                        </div>
                    </div>

                    <div className='border-l-2 pl-10 font-medium'>
                        <div className='flex gap-[47px] '>
                            <p className='text-accent-200'>No. Pesanan</p>
                            <p>: P00107092023S1BOX1</p>
                        </div>
                        <div className='flex gap-8 '>
                            <p className='text-accent-200'>Tanggal Pesan</p>
                            <p>: 17 september 2023</p>
                        </div>
                        <div className='flex gap-[91px] '>
                            <p className='text-accent-200'>Status</p>
                            <p>: Menunggu Konfirmasi</p>
                        </div>
                        <div className='flex gap-5 mt-4'>
                            <button className='w-[104px] h-[30px] bg-red-600 text-white rounded-lg'>Detail</button>
                            <button className='w-[104px] h-[30px] bg-accent-200 text-white rounded-lg'>Terima</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default PesananMasuk
