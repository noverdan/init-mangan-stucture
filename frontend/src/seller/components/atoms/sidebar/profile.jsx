import React from 'react'


function ProfileSidebar() {
    return (
        <div className='py-1 text-white'>
            <div id='profile' className='flex py-2 md:py-4 justify-between items-center border-b-[1px] border-white'>
                <div className='flex items-center gap-3'>
                    <img className='rounded-[49px] md:w-16 w-6 ' src="https://via.placeholder.com/49x49" alt="" />
                    <div className=''>
                        <h1 className='font-bold text-xs md:text-base '>John Pukimak</h1>
                        <p className='text-[10px] md:text-xs'>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSidebar
