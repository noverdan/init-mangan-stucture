import React from 'react'
import { motion } from 'framer-motion'
import FromAdd from './form-add-product';
import useToogleVisibility from '../../../../utils/formVisible';

function ProductInput() {
    const [isFormVisible, toggleFormVisibility] = useToogleVisibility(false);

    const handleButtonClick = () => {
        toggleFormVisibility(!isFormVisible);
    }

    console.log(handleButtonClick)

    return (
        <div className="space-y-3" >
            {isFormVisible && (
                <FromAdd />
            )}
            <div className='space-y-2'>
                <h1 className='font-semibold md:text-base text-accent-200'>Nama Paket </h1>
                <input className='w-56 md:w-[400px] font-bold px-3 py-3 md:py-6 h-7 rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15)]' />
            </div>

            <div className='space-y-2'>
                <h1 className='font-semibold text-accent-200'>Variasi Menu</h1>
                <div className='w-56 md:w-[400px] px-3 py-3 md:py-6 flex flex-col items-center rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15)] bg-white' >
                    <motion.button
                        whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)", boxShadow: "0px 0px 8px #005461" }}
                        whileTap={{ scale: 0.5 }}
                        onClick={handleButtonClick}
                        className='bg-accent-200 md:w-40 w-24 text-xs md:text-base text-white rounded-xl p-2 hover:bg-accent-100 hover:duration-300' >
                        {isFormVisible ? 'batalakan' : 'Tambah Menu'}
                    </motion.button>
                </div>

            </div>
        </div>


    )
}

export default ProductInput
