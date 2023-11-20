import React from 'react'
import { Icon } from '@iconify/react';

function Dashboard() {
    return (
        <div className='w-1/4 bg-[#ffff]'>
            <div className='py-3 px-8'>
                <img className='w-28 h-12 m-auto' src="/logo-mangan.svg" alt="" />

                <div className='py-16'>
                    <div id='profile' className='flex gap-3 items-center'>
                        <img className='rounded-[49px]' src="https://via.placeholder.com/49x49" alt="" />
                        <div className=''>
                            <h1 className='font-bold text-lg'>John Doe</h1>
                            <p className='text-sm'>Admin</p>
                        </div>
                        <Icon icon="line-md:chevron-down" rotate={3} hFlip={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
