import React from 'react';
import { Icon } from '@iconify/react';

function EaseOrdering() {
    return (
        <section className='w-[360px] flex flex-col mx-auto lg:w-full py-14 px-0 text-primary-100 '>
            <header className='font-semibold text-xl text-center'>Kemudahan Pemesanan</header>
            <div className='grid grid-cols-2 lg:flex lg:flex-row gap-4 lg:gap-7 items-center mx-auto mt-7'>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-36 lg:w-44 aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa-solid:map-marked-alt" className='text-primary-100' width="70" />
                        <p className='font-medium'>Pilih Kota</p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-36 lg:w-44  aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa6-solid:utensils" className='text-primary-100' width="50" />
                        <p className='font-medium'>Pilih Katering</p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-36 lg:w-44  aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa6-solid:money-bill-wave" className='text-primary-100' width={65} />
                        <p className='font-medium'>Bayar</p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-36 lg:w-44  aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa6-solid:fire-burner" className='text-primary-100' width={70} />
                        <p className='font-medium'>Dimasak</p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-2 justify-center items-center w-36 lg:w-44  aspect-square shadow-[#00000044] shadow-md rounded-lg bg-white border-primary-100 border-2'>
                        <Icon icon="fa6-solid:truck-fast" className='text-primary-100' width={65} />
                        <p className='font-medium'>Bayar</p>
                    </div>
                </div>
            </div>
            <div id='about-us'></div>
        </section>
    )
}
export default EaseOrdering