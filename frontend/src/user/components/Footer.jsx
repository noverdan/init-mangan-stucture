import LogoManganWhite from '/logo-mangan-white.svg'
import { Icon } from '@iconify/react';

function Footer() {
    return (
        <>
            <footer className='px-0 md:px-20 bg-primary-100'>
                <div className="flex flex-col gap-6 w-[360px] mx-auto md:flex-row md:w-full md:mx-0 lg:gap-20 md:gap-10 py-14 ">
                    <div className='flex flex-col gap-2 md:gap-4 md:w-1/2'>
                        <img src={LogoManganWhite} alt="Logo Mangan" width={180} />
                        <h1 className='text-base md:text-lg font-semibold text-white'>Temukan katering sesuai dengan preferensi anda dengan mudah dan cepat di “ManGan”.</h1>
                        <div className='flex justify-between md:flex-col md:gap-2'>
                            <div className='flex items-center'>
                                <Icon icon="mdi:email" color="white" width="20" height="20" />
                                <span>
                                    <a href="mailto:alamat-email@contoh.com" className='text-white ml-2 hover:text-opacity-75'>contact@mangan.com</a>
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <Icon icon="foundation:telephone" color="white" width="20" height="20" />
                                <span>
                                    <a href="tel:(0281) 18082" className='text-white ml-2 hover:text-opacity-75'>(0281) 18082</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-1/2 lg:flex lg:gap-4 grid grid-cols-2 justify-items-start md:justify-items-end lg:justify-between '>
                        <div className='flex flex-col md:w-fit lg:w-full'>
                            <header className='font-semibold text-lg text-white mb-4'>Layanan Kami</header>
                            <div className='flex flex-col gap-2'>
                                <span>
                                    <a href="" className='text-white hover:text-opacity-75'>Paket Katering</a>
                                </span>
                                <span>
                                    <a href="" className='text-white hover:text-opacity-75'>About Us</a>
                                </span>
                                <span>
                                    <a href="" className='text-white hover:text-opacity-75'>Join With Us</a>
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col md:w-fit lg:w-full'>
                            <header className='font-semibold text-lg mb-4 text-white'>Social</header>
                            <div className='flex flex-col gap-2'>
                                <span>
                                    <a href="" className='flex items-center gap-1 text-white hover:text-opacity-75'>
                                        <Icon icon="mdi:instagram" width="18" height="18" />
                                        <p>Instagram</p>
                                    </a>
                                </span>
                                <span>
                                    <a href="" className='flex items-center gap-1 text-white hover:text-opacity-75'>
                                        <Icon icon="pajamas:twitter" width="18" height="18" />
                                        <p>Twitter / X</p>
                                    </a>
                                </span>
                                <span>
                                    <a href="" className='flex items-center gap-1 text-white hover:text-opacity-75'>
                                        <Icon icon="ic:baseline-facebook" width="20" height="20" />
                                        <p>Facebook</p>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col pt-8 col-span-2 w-full items-start md:items-end '>
                            <p className='text-white'>Supported by</p>
                            <img className='' src="https://skilvul.com/static/skilvul-logo-white.svg" alt="" width={150} />
                        </div>
                    </div>
                </div>
                <hr className='border border-white border-opacity-50' />
                <div>
                    <p className='text-white text-sm py-5 text-center'>Copyright© 2023 ManGan | All Right Reserved</p>
                </div>
            </footer>
        </>
    )
}

export default Footer