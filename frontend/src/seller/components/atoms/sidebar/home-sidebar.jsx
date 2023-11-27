import React from 'react'
import { Icon } from '@iconify/react';

function HomeSidebar() {
    return (
        <div className='flex text-white md:gap-2  py-4  border-b-[1px] border-white items-center gap-1 '>
            <Icon className='text-[9px] md:text-base' icon="line-md:home-simple-twotone" />
            <h1 className='font-bold text-[9px] md:text-base '>Dashboard</h1>
        </div>

    )
}

export default HomeSidebar
