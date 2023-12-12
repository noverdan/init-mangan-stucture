import React from 'react';
import LogoManganWhite from '/logo-mangan.svg'

function AboutUs() {
    return (
        <section className='bg-transparent lg:w-full w-[360px] mx-auto lg:mx-0 text-primary-100 lg:px-20 py-14'>
            <header className=' font-semibold text-xl text-center'>Tentang Kami</header>
            <div className='flex flex-col gap-4 lg:flex-row mt-8 lg:mt-5'>
                <img src={LogoManganWhite} alt="" className='lg:w-1/2 lg:pr-24' />
                <p className='lg:w-1/2 text-center lg:text-start text-lg'>Selamat datang di Mangan, penyedia layanan catering online. Kami berkomitmen untuk memberikan pengalaman kuliner yang tak terlupakan kepada pelanggan kami.
                    <br /><br /> Mangan telah berdiri sejak 2023 dan sejak itu, kami telah melayani ribuan acara khusus dengan penuh dedikasi dan keahlian kami dalam bidang kuliner. Kami memahami bahwa makanan adalah salah satu elemen terpenting dalam setiap perayaan atau acara, dan kami berusaha untuk menjadikan setiap hidangan spesial </p>
            </div>
        </section>
    )
}

export default AboutUs