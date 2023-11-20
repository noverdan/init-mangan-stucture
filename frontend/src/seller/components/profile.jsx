import React from 'react'
import { Icon } from '@iconify/react';

function Profile() {
    return (
        <div>
            <div className='py-1 text-white'>
                <div id='profile' className='flex py-4 gap-3 items-center border-b-[1px] border-white'>
                    <img className='rounded-[49px]' src="https://via.placeholder.com/49x49" alt="" />
                    <div className=''>
                        <h1 className='font-bold text-lg '>John Pukimak And Go</h1>
                        <p className='text-sm'>Admin</p>
                    </div>
                    <Icon icon="line-md:chevron-down" rotate={3} hFlip={true} />
                </div>
            </div>
        </div>
    )
}

export default Profile
