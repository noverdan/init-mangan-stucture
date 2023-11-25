import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FromAdd from './form-add-product';

function ProductList() {
    const [image, setImage] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible)
    }

    const handleUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    return (
        <motion.div className={`flex pl-9 pt-24 gap-28 duration-200 ${isFormVisible ? 'backdrop:blur' : ''} `}
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }} >

            <div className='flex flex-col items-center'>

                <div className='w-56 h-56 shadow-xl bg-white rounded-[10px] border-[0.5px] border-accent-200 overflow-hidden'>
                    {image && <img src={image} alt="Uploaded" className="w-full h-full object-cover" />}
                </div>

                <div className='mt-6 mr-2' >
                    <motion.input whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.5 }} type="file" id="upload" hidden onChange={handleUpload} />
                    <label htmlFor="upload"
                        className="cursor-pointer  w-40  bg-accent-200 text-white rounded-xl p-3 hover:bg-accent-100 hover:duration-300">
                        Upload Image
                    </label>
                </div>

            </div>

            <div className='space-y-3'>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-accent-200'>Nama Paket </h1>
                    <input className='w-[500px] font-bold px-3 py-6 h-11 rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15)]' />
                </div>

                <div className='space-y-2'>
                    <h1 className='font-semibold text-accent-200'>Variasi Menu</h1>
                    <div className='w-[500px] px-3 py-6 flex flex-col items-center rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15)] bg-white' >
                        <motion.button
                            whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)", boxShadow: "0px 0px 8px #005461" }}
                            whileTap={{ scale: 0.5 }}
                            onClick={handleButtonClick}
                            className='bg-accent-200 w-40  text-white rounded-xl p-2 hover:bg-accent-100  hover:duration-300' >
                            {isFormVisible ? 'batalakan' : 'Tambah Menu'}
                        </motion.button>
                    </div>
                </div>
                {isFormVisible && (
                    <FromAdd />
                )}
            </div>

        </motion.div>
    )
}

export default ProductList
