import Sidebar from '../components/sidebar';
import React, { useState } from 'react'
import Hamburger from 'hamburger-react';
import { Icon } from '@iconify/react';

function Keuangan() {
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
                    <div className='mt-16 flex flex-wrap gap-3'>
                        <div className="md:w-[319px] md:h-40 w-24 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-[10px] shadow" >

                        </div>
                        <div className="md:w-[318px] md:h-40 w-24 h-20 bg-gradient-to-r from-pink-500 to-red-400 rounded-[10px] shadow" >

                        </div>
                        <div className="md:w-[319px] md:h-40 w-24 h-20 bg-purple-200 rounded-[10px] shadow" >
                        </div>
                    </div>
                </div>

                <div className='flex  md:w-full flex-col  mt-8 bg-white p-6 rounded-xl shadow-xl '>
                    <h1 className='font-bold mb-3 text-[#c6aa58]'>transaki baru</h1>
                    <table className="border-collapse bg-white border-white ...">
                        <thead>
                            <tr className=''>
                                <th className="text-accent-200 border-r-[1px] text-left  pr-1 border-accent-200 ">
                                    Invoice</th>
                                <th className="text-accent-200 border-r-[1px] text-left pl-1  border-accent-200 ...">
                                    Pemesan</th>
                                <th className="text-accent-200 border-r-[1px] text-left  pl-1 border-accent-200 ">
                                    Sub Total</th>
                                <th className="text-accent-200 text-left pl-1 pr-3 border-accent-200 ...">
                                    Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="border-t-[1px] border-accent-200  text-black">90000</td>
                                <td className="border-t-[1px] border-x-[1px] pl-1 pr-3 border-accent-200 text-black">Ikan mas</td>
                                <td className="border-t-[1px]  border-accent-200 pl-1 pr-8 text-black">10000</td>
                                <td className="border-t-[1px] border-l-[1px] pl-1 text-black  border-accent-200">Di terima</td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    )
}

export default Keuangan
