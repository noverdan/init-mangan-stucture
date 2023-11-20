import React from 'react'
import Profile from './profile';

function Dashboard() {
    return (
        <div className='w-1/4 bg-[#005461] h-[100vh] overflow-auto'>
            <div className='py-3 px-8'>
                <img className='w-28 h-12 m-auto' src="/logo-mangan.svg" alt="" />
                <Profile />
            </div>
        </div>
    )
}

export default Dashboard
