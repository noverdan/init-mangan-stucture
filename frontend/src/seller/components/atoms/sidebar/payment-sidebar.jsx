import React from 'react'
import { Icon } from '@iconify/react';

function PaymentSidebar() {
    return (
        <div>
            <div className='py-1 text-white'>
                <div id='profile' className='flex justify-between w-full py-4  items-center border-b-[1px] border-white'>
                    <div className='flex items-center gap-3'>
                        <Icon icon="solar:card-2-bold-duotone" />
                        <div className=''>
                            <h1 className='font-bold text-xs md:text-base '>Keuangan</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSidebar
