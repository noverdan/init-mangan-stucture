import React, { useState } from 'react'
import { motion } from 'framer-motion'

function FromAdd() {
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
        <motion.div className='absolute  top-[20%] text-accent-200' initial={{ y: -100 }} animate={{ y: 0 }} >
            <form action="" className='flex items-center md:flex-col flex-wrap gap-4  p-2 rounded-lg bg-white'>
                <div className='m-auto flex flex-col gap-2'>
                    <div className='w-20 h-20 bg-white min-[500px]:w-40 min-[500px]:h-40 md:w-56 md:h-56 rounded-[10px] border-[0.5px] border-accent-200 overflow-hidden'>
                        {img && <img src={img} alt="Uploaded" className="w-full h-full object-cover" />}
                    </div>
                    <input type="file" id='img' hidden onChange={handleUploadImg} />
                    <label htmlFor="img"
                        className="cursor-pointer md:text-base m-auto w-14 text-xs bg-accent-200 text-white rounded-xl p-2 hover:bg-accent-100 hover:duration-300">
                        Upload
                    </label>
                </div>

                <div className=''>
                    <label htmlFor="">nama Menu</label> <br />
                    <input type="text" className='p-[0.1px]  rounded border-accent-200' />
                </div>
                <div>
                    <label htmlFor="">harga</label> <br />
                    <input type="text" className='p-[0.1px]  rounded border-accent-200' />
                </div>

                <div className=''>
                    <label htmlFor="">nama Menu</label> <br />
                    <input type="text" className='p-[0.1px]  rounded border-accent-200' />
                </div>
                <div>
                    <label htmlFor="">harga</label> <br />
                    <input type="text" className='p-[0.1px]  rounded border-accent-200' />
                </div>
            </form>

        </motion.div >
    )
}

export default FromAdd
