import React from 'react'
import { Icon } from '@iconify/react';

function PaymentSidebar() {
    return (
        <div className='flex text-white md:gap-2  py-4  border-b-[1px] border-white items-center gap-1 '>
            <Icon className='text-[9px] md:text-base' icon="solar:card-2-bold-duotone" />
            <h1 className='font-bold text-[9px] md:text-base'>Keuangan</h1>
        </div>
    )
}

export default PaymentSidebar
