import HeroImage from '../../../assets/catering-hero-image.jpg'

function Hero() {
    return (
        <section id='home' className="h-screen bg-white pt-20 w-[360px] lg:w-full mx-auto">
            <div className="bg-cover bg-center w-full h-1/2 lg:h-[340px] relative " style={{ backgroundImage: `url(${HeroImage})` }}>
                <div className='flex flex-col gap-3 justify-center bg-black bg-opacity-50 absolute w-full h-full text-white'>
                    <p className='font-extrabold text-2xl lg:text-4xl text-center' style={{ textShadow: '5px 7px 5px #00000086' }}>Temukan Katering dengan Mudah & Cepat</p>
                    <p className='font-semibold text-base lg:text-lg text-center' style={{ textShadow: '5px 7px 5px #00000086' }}>Jelajahi Berbagai Jenis Katering</p>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-5 lg:gap-20 px-2 pt-4 lg:pt-0 lg:px-20 h-[29vh]'>
                <div className='flex flex-col justify-center lg:w-1/2'>
                    <p className='font-bold text-xl lg:text-2xl text-primary-100 text-center lg:text-start'>Temukan Katering Terbaik di Daerah Anda</p>
                    <p className='text-base lg:text-lg mt-2 lg:mt-0 text-center lg:text-start'>Eksplor penyedia layanan katering terdekat di wilayah anda dan pilih sesuai dengan preferensi anda</p>
                </div>
                <div className='flex items-center lg:w-1/2'>
                    <div className='w-full flex'>
                        <input className='bg-bg-200 w-full border-bg-200 rounded-l-lg transition-colors hover:border-primary-100  focus:border-primary-100 focus:ring-0'
                            type="text" placeholder='Masukan nama kota anda' />
                        <button className='bg-primary-100 text-white px-3 py-2 border-primary-100 border rounded-r-lg hover:bg-opacity-75 active:bg-opacity-100'>Jelajahi</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero