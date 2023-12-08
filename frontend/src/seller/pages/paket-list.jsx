import Sidebar from "../components/sidebar"
import React, { useState } from 'react'
import Hamburger from 'hamburger-react';


function PaketList({ paketInfo }) {
    const [isOpen, setIsOpen] = useState(true);

    console.log(paketInfo)
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className={`flex items-start h-auto overflow-hidden transition-all ease-in-out duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-1'}`}>
            {isOpen && <Sidebar />}
            <button className='z-20 hover:bg-bg-300 rounded-full transition-colors ' onClick={toggleSidebar}>
                <Hamburger size={20} easing="ease-in" color='black' toggled={isOpen} toggle={setIsOpen} />
            </button>
            <div className="m-9 w-[200px] h-[277px] px-[26px] py-[18px] bg-slate-50 rounded-[15px] border border-sky-900 ">
                <img className="w-[148px] h-[137px] rounded-[10px] bg-bg-300" src="" alt="" />
                <div className="mt-4">
                    <h1 className="text-accent-200 font-semibold">Nama Paket</h1>
                    <p className="text-sm">Rp.20.000-Rp.40.000</p>
                    <p className="text-xs">5 menu</p>
                    <div className="flex justify-between mt-[10px]">
                        <button className=" w-16 bg-red-600 hover:bg-red-900 text-white transition-colors h-7 rounded-xl">Hapus</button>
                        <button className="bg-accent-200 text-white hover:bg-[#00454f]  w-16    h-7  rounded-xl  ">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaketList
