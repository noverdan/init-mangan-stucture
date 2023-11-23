import React from 'react';
import { Icon } from '@iconify/react';

function EaseOrdering() {
    return (
        <section className='w-full py-14 px-20 text-primary-100'>
            <header className='font-semibold text-xl text-center'>Kemudahan Pemesanan</header>
            <div className='flex justify-between mt-7 mx-10'>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-44 aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa-solid:map-marked-alt" className='text-primary-100' width="70" />
                        <p className='font-medium'>Pilih Kota</p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-44 aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa6-solid:utensils" className='text-primary-100' width="50" />
                        <p className='font-medium'>Pilih Katering</p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-44 aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa6-solid:money-bill-wave" className='text-primary-100' width={65} />
                        <p className='font-medium'>Bayar</p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-44 aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa6-solid:fire-burner" className='text-primary-100' width={70} />
                        <p className='font-medium'>Dimasak</p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-44 aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa6-solid:truck-fast" className='text-primary-100' width={65} />
                        <p className='font-medium'>Bayar</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default EaseOrdering