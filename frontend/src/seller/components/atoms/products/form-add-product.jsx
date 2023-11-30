import React from 'react'
import { motion } from 'framer-motion'

function FromAdd() {
    return (
        <motion.div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-md p-6  text-accent-200 ' initial={{ y: -100 }} animate={{ y: 0 }} >
            <form action="" className='flex justify-center md:flex-col flex-wrap gap-4 h-auto  p-2 my-5 rounded-lg bg-white'>
                <div className=''>
                    <label htmlFor="">nama Menu</label> <br />
                    <input type="text" className='p-[0.1px]  rounded border-accent-200' />
                </div>
                <div>
                    <label htmlFor="">harga</label> <br />
                    <input type="text" className='p-[0.1px]  rounded border-accent-200' />
                </div>
            </form>
        </motion.div>
    )
}

export default FromAdd
