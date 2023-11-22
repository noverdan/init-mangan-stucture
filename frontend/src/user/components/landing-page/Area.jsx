import React from 'react';
import CoverageArea from '../../../assets/coverage-area.png'

function Area() {
    return (
        <section className='mx-20 bg-primary-100 rounded-3xl text-white px-10 py-14 mb-10'>
            <header className='font-semibold text-xl text-center'>Jangkauan Kami</header>
            <div className='flex gap-10 mt-7'>
                <img className='w-1/2 object-contain' src={CoverageArea} alt="" />
                <p className='w-1/2'>Untuk menjangkau lebih banyak pelanggan, banyak layanan katering sudah bekerjasama dengan kami, yang tersebar berbagai kota di pulau jawa. Kota kota yang sudah kami jangkau antara lain JAKARTA, BEKASI, BANDUNG, PURWOKERTO, SEMARANG, YOGYAKARTA, dan SURABAYA. Anda dapat memesan katering di kota kota tersebut melalui kami dengan cepat dan mudah. Jika anda mempunyai usaha katering anda juga bisa bergabung dengan kami untuk menjangkau wilayah yang labih luas. </p>
            </div>
            <div id='catering'></div>
        </section>
    )
}

export default Area