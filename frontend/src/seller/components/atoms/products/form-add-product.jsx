import React from 'react'
import { motion } from 'framer-motion'

function FromAdd() {
    return (
        <motion.div className='absolute top-0 left-0' initial={{ y: -100 }} animate={{ y: 0 }} >
            <form action=""
                className='w-[500px] h-auto px-3 py-6 flex my-5 rounded-lg shadow-[6px_6px_7px_-1px_rgba(0,0,0,0.15)] bg-accent-200'>
                <input type="text" className='h-4 rounded' />
                <label htmlFor=""></label>
            </form>
        </motion.div>
    )
}

export default FromAdd
