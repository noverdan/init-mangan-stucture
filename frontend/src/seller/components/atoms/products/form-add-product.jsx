import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react';
import AddMenuName from './add-menu-name';
import InputMenu from './input-menu';
import InputMenuTambahan from './input-menu-tambahan';

function FormAdd() {
    const [img, setImg] = useState(null);
    const handleUploadImg = (event) => {
        const file = event.target.files[0]

        const reader = new FileReader();

        reader.onloadend = () => {
            setImg(reader.result);
        }
        if (file) {
            reader.readAsDataURL(file)
        }

    }

    return (
        <motion.div className='absolute md:left-12 top-[5%]  text-accent-200' initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            <form action="" className='flex  border-[0.5px] border-accent-200 md:flex-col p-4 overflow-auto items-center flex-wrap gap-4 rounded-lg bg-white'>
                <button className='md:ml-[650px]'>
                    <Icon className='text-2xl md:text-[50px] cursor-pointer' icon="line-md:close-small" />
                </button>
                <h1 className='-mt-14 mx-20 md:text-xl  font-bold'>Edit Menu</h1>

                <div className='md:flex md:gap-4' >
                    <div className='flex flex-col items-center md:px-0 px-20 gap-2'>
                        <div className='w-20 h-20 bg-white min-[500px]:w-40 min-[500px]:h-40 md:w-40 md:h-45 rounded-[10px] border-[0.5px] border-accent-200 overflow-hidden'>
                            {img && <img src={img} alt="Uploaded" className="w-full h-full object-cover" />}
                        </div>
                        <input type="file" id='img' hidden onChange={handleUploadImg} />
                        <label htmlFor="img"
                            className="cursor-pointer md:text-base  md:w-full text-center w-14 text-xs bg-accent-200 text-white rounded-xl p-2 hover:bg-accent-100 hover:duration-300">
                            Upload
                        </label>
                    </div>

                    <div className=''>
                        <AddMenuName />
                        <h1 className='my-2 font-bold'>Isi Menu</h1>
                        <div className='flex md:gap-4 md:flex-row flex-col gap-4'>
                            <InputMenu />
                            <InputMenuTambahan />
                        </div>
                    </div>

                </div>
                <button className='bg-accent-200 md:px-4 md:py-2 rounded-xl   text-white m-auto md:mr-8  p-1'>Simpan</button>
            </form>

        </motion.div >
    )
}

export default FormAdd
