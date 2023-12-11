import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import useToogleVisibility from '../../../../utils/formVisible';
import FormAdd from './form-add-product';
import MenuList from './menu-list';
import { ProductContext } from '../../../context/product-provider';

function ProductInput() {
    const [isFormVisible, toggleFormVisibility] = useToogleVisibility(false);

    const handleButtonClick = () => {
        toggleFormVisibility(!isFormVisible);
    }

    const [inputPaket, setInputPaket] = useState('');

    const handleClick = (e) => {
        e.preventDefault();

        let newPaket = {
            id: new Date(),
            nama: inputPaket,
            menu: []
        }
        console.log(newPaket)
    }

    const { product } = useContext(ProductContext)



    return (
        <div className="space-y-3" >
            <div className='space-y-2 flex flex-col '>
                <label className='font-semibold md:text-base text-accent-200'>Nama Paket </label>
                <input placeholder='masukan nama paket'
                    value={inputPaket}
                    onChange={(e) => setInputPaket(e.target.value)}
                    className='w-56  border-[0.5px] md:w-[700px] placeholder:italic placeholder:text-slate-400  border-accent-200  px-3 py-3 md:py-6 h-7 rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15)]' />
                <label className='font-semibold md:text-base  text-accent-200'>Deskripsi </label>
                <input placeholder='masukan deskripsi paket'

                    className='w-56  border-[0.5px] md:w-[700px] placeholder:italic placeholder:text-slate-400 border-accent-200  px-3 py-3 md:py-6 h-7 rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15)]' />

            </div>

            <div className='space-y-2 '>
                <h1 className='font-semibold text-accent-200'>Variasi Menu</h1>

                <div className='w-56 border-[0.5px] border-accent-200 px-3 py-3 h-80 overflow-auto flex flex-col  rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15)] bg-white
                    md:w-[700px] md:py-6' >
                    {product.map((products) => (
                        products.menu.map((menu) => (
                            <MenuList key={menu.id} menu={menu} />
                        ))
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)", boxShadow: "0px 0px 8px #005461" }}
                        whileTap={{ scale: 0.5 }}
                        onClick={handleButtonClick}
                        className='bg-accent-200 m-auto md:w-40 w-24 text-xs md:text-base text-white rounded-xl p-2 hover:bg-accent-100 hover:duration-300' >
                        {isFormVisible ? 'batalakan' : 'Tambah Menu'}
                    </motion.button>
                </div>
            </div>

            <div className='flex gap-2 ml-3'>
                <button
                    className='items-end bg-accent-200 md:w-32 w-24 text-xs md:text-base text-white rounded-xl p-2 hover:bg-accent-100 hover:duration-300'
                    onClick={handleClick}>Simpan
                </button>
                <button
                    className='items-end bg-white border-[0.5px] border-accent-200 text-accent-200 md:w-32 w-24 text-xs md:text-base  rounded-xl p-2 hover:bg-accent-100 hover:duration-300'
                >Simpan
                </button>
            </div>
            {isFormVisible && (
                <FormAdd />
            )}
        </div>
    )
}

export default ProductInput
