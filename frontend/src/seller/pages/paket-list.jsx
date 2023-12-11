import Sidebar from "../components/sidebar"
import React, { useContext, useState } from 'react'
import Hamburger from 'hamburger-react';
import { ProductContext } from "../context/product-provider";


function PaketList() {
    const [isOpen, setIsOpen] = useState(true);
    const { product } = useContext(ProductContext)


    const sortedProducts = [...product].sort((a, b) => {
        const minPriceA = Math.min(...a.menu.map(menu => menu.price));
        const minPriceB = Math.min(...b.menu.map(menu => menu.price));
        return minPriceA - minPriceB;
    });


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className={`flex items-start bg-bg-300 h-screen overflow-auto transition-all ease-in-out duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-1'}`}>
            <div className="flex  h-full">
                {isOpen && <Sidebar />}
                <button className='z-20 w-9 h-9  rounded-full transition-colors ' onClick={toggleSidebar}>
                    <Hamburger size={20} easing="ease-in" color='black' toggled={isOpen} toggle={setIsOpen} />
                </button>
            </div>
            <div className="flex h-full overflow-auto  flex-wrap">
                {sortedProducts.map((paket) => (
                    <div className="m-9 w-[200px] flex flex-col gap-5  h-[277px] px-[26px] py-[18px] bg-white rounded-[15px] border border-sky-900 ">
                        <img className="w-[148px] h-[137px] rounded-[10px] bg-bg-300" src={paket.image} alt="" />
                        <div className="flex flex-col ">
                            <div>
                                <h1 className="text-accent-200 font-semibold">{paket.namaPaket}</h1>
                                <p className="text-sm font-medium">{`Rp.${Math.min(...paket.menu.map(menu => menu.price))}-Rp.${Math.max(...paket.menu.map(menu => menu.price))}`}</p>
                                <p className="text-xs">{`${paket.menu.length} menu`}</p>
                            </div>
                            <div className="flex justify-between">
                                <button className=" w-16 bg-red-600  hover:bg-red-900 text-white  transition-colors h-7 rounded-xl">Hapus</button>
                                <button className="bg-accent-200 text-white hover:bg-[#00454f]  w-16    h-7  rounded-xl  ">Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PaketList
