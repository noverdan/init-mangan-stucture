import React from 'react'


function ProfileSidebar() {
    return (
        <div className='flex text-white gap-1  py-2 md:py-4 md:gap-4 items-center border-b-[1px] border-white'>
            <img className='rounded-[49px] md:w-16 w-6 ' src="https://via.placeholder.com/49x49" alt="" />
            <div className=''>
                <h1 className='font-bold text-[9px] md:text-base '>John Pukimak</h1>
                <p className='text-[7px] md:text-xs'>Admin</p>
            </div>
        </div>
    )
}

export default ProfileSidebar
