import React, { useContext, useEffect, useState } from 'react'

function MenuList({ menu }) {

    const [storedMenuData, setStoredMenuData] = useState({});

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('menuData'));
        setStoredMenuData(storedData);
        console.log(storedData)
    }, []);


    return (
        <div className='flex gap-2 shadow-xl  bg-accent-200 rounded-[10px] text-white p-3  mb-6'>
            <img src={menu.image} alt="" className='w-24 h-24 rounded-[10px] bg-white' />
            <div className='flex flex-col '>
                <h1 className='font-bold text-[#c6aa58]'>{menu.nameMenu}</h1>
                <table className="border-collapse  border-white ...">
                    <thead>
                        <tr className=''>
                            <th className="text-[#f1efc8] border-r-[1px] text-left  pr-1 border-white ">
                                Makanan pokok</th>
                            <th className="text-[#f1efc8] border-r-[1px] text-left  border-white ...">
                                Sayur</th>
                            <th className="text-[#f1efc8] border-r-[1px] text-left  border-white ">
                                Lauk 1</th>
                            <th className="text-[#f1efc8] border-r-[1px] text-left  pr-3 border-white ...">
                                Tambahan 1</th>
                            <th className="text-[#f1efc8] text-left  pr-3 border-white ...">
                                Harga</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="border-t-[1px] border-white ">{menu.makananPokok}</td>
                            <td className="border-t-[1px] border-x-[1px] pl-1 pr-3 border-white">{menu.sayuran}</td>
                            <td className="border-t-[1px]  border-white pl-1 pr-8 ">{menu.lauk}</td>
                            <td className="border-t-[1px] border-l-[1px] pl-1 pr-4 border-white">{menu.tambahan1}</td>
                            <td className="border-t-[1px] border-l-[1px] pl-1 pr-4 border-white">{menu.price}</td>
                        </tr>
                    </tbody>

                </table>

            </div>
        </div>



    )
}

export default MenuList
