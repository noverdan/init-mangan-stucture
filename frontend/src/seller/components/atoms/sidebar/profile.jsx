import React from 'react'


function ProfileSidebar() {
    return (
        <div>
            <div className='py-1 text-white'>
                <div id='profile' className='flex py-4 justify-between items-center border-b-[1px] border-white'>
                    <div className='flex items-center gap-3'>
                        <img className='rounded-[49px]' src="https://via.placeholder.com/49x49" alt="" />
                        <div className=''>
                            <h1 className='font-bold text-base '>John Pukimak</h1>
                            <p className='text-xs'>Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSidebar
