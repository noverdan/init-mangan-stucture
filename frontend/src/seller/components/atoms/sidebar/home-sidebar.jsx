import React from 'react'
import { Icon } from '@iconify/react';

function HomeSidebar() {
    return (
        <div>
            <div className='py-1 text-white'>
                <div id='profile' className='flex justify-between w-full py-4  items-center border-b-[1px] border-white'>
                    <div className='flex items-center gap-3'>
                        <Icon icon="line-md:home-simple-twotone" />
                        <div className=''>
                            <h1 className='font-bold text-base '>Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeSidebar
