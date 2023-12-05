import React, { useContext } from 'react'
import { ProductContext } from '../../../context/product-provider'

function MenuList() {
    const { product } = useContext(ProductContext)


    return (
        <div >
            {product.map((products) => (
                <div key={products.id} className='flex gap-2  bg-accent-200 rounded-[10px] text-white p-3  mb-6'>
                    <img src={products.image} alt="" className='w-24 h-24 rounded-[10px] bg-white' />
                    <div className='flex flex-col '>
                        {products.menu.map((menu) => (
                            <div><h1 className='font-bold' >{menu.nameMenu}</h1>
                                <table className="border-collapse  border-white ...">
                                    <thead>
                                        <tr className=''>
                                            <th className="font-normal border-r-[1px] text-left  pr-1 border-white ">
                                                Makanan pokok</th>
                                            <th className="font-normal border-r-[1px] text-left  border-white ...">
                                                Sayur</th>
                                            <th className="font-normal border-r-[1px] text-left  border-white ">
                                                Lauk 1</th>
                                            <th className="font-normal border-r-[1px] text-left  pr-3 border-white ...">
                                                Tambahan 1</th>
                                            <th className="font-normal text-left  pr-3 border-white ...">
                                                harga</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border-t-[1px] border-white ">{menu.nameMenu}</td>
                                            <td className="border-t-[1px] border-x-[1px] pl-1 pr-8 border-white">{menu.price}</td>
                                            <td className="border-t-[1px]  border-white pl-1 pr-8 ">{menu.makananPokok}</td>
                                            <td className="border-t-[1px] border-l-[1px] pl-1 pr-4  border-white">{menu.lauk}</td>
                                            <td className="border-t-[1px] border-l-[1px] pl-1 pr-4  border-white">{menu.nameMenu}</td>
                                        </tr>
                                    </tbody>
                                </table></div>
                        ))}


                    </div>
                </div>
            ))}

        </div >
    )
}

export default MenuList
