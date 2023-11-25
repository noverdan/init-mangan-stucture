import React from 'react'
import { motion } from 'framer-motion'

function FromAdd() {
    return (
        <motion.div className='absolute top-0 left-0 text-accent-200 ' initial={{ y: -100 }} animate={{ y: 0 }} >
            <form action="" className='w-[500px] flex gap-4 h-auto  p-2 my-5 rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15) bg-white'>
                <div>
                    <label htmlFor="">nama Menu</label> <br />
                    <input type="text" className='p-[0.1px] rounded border-accent-200' />
                </div>
                <div>
                    <label htmlFor="">harga</label> <br />
                    <input type="text" className='p-[0.1px] rounded border-accent-200' />
                </div>
            </form>
        </motion.div>
    )
}

export default FromAdd
