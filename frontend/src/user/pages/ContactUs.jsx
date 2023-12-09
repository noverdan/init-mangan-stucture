import React from 'react';
import NavbarUser from '../components/NavbarUser';
import { SearchProvider } from '../context/SearchProvider';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
    const navigate = useNavigate()

    return (
        <SearchProvider>
            <NavbarUser />
            <main className='mt-20 w-[360px] mx-auto'>
                <section className="flex items-center mt-5 relative">
                    <button onClick={() => navigate(-1)} className="text-primary-100 absolute left-0">
                        <Icon icon="material-symbols:arrow-back" width={27} />
                    </button>
                    <h1 className="mx-auto text-primary-100 font-bold">Hubungi Kami</h1>
                </section>
                <hr className='my-4 border-gray-300' />
                <section className=''>
                    <p className='text-accent-200'>Jika anda memiliki masukan, saran dan kritik atau jika anda mengalami kendala saat menggunakan platform ManGan anda dapat menghubungi kontak dan sosial media kami dibawah ini. </p>
                    <div className='p-2 border border-primary-100 rounded mt-4 flex flex-col gap-2'>
                        <div className='flex items-center'>
                            <Icon icon="mdi:email" width="20" height="20" className='text-primary-100' />
                            <span>
                                <a href="mailto:alamat-email@contoh.com" className='text-primary-100 ml-2 hover:text-opacity-75'>contact@mangan.com</a>
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Icon icon="foundation:telephone" width="20" height="20" className='text-primary-100' />
                            <span>
                                <a href="tel:(0281) 18082" className='text-primary-100 ml-2 hover:text-opacity-75'>(0281) 18082</a>
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Icon icon="ri:whatsapp-fill" width="20" height="20" className='text-primary-100' />
                            <span>
                                <a href="" className='text-primary-100 ml-2 hover:text-opacity-75'>0865456776543</a>
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Icon icon="ri:instagram-fill" width="20" height="20" className='text-primary-100' />
                            <span>
                                <a href="" className='text-primary-100 ml-2 hover:text-opacity-75'>mangan_ig</a>
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Icon icon="simple-icons:x" width="17" className='text-primary-100' />
                            <span>
                                <a href="" className='text-primary-100 ml-3 hover:text-opacity-75'>mangan_tweet</a>
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Icon icon="ic:baseline-facebook" width="20" className='text-primary-100' />
                            <span>
                                <a href="" className='text-primary-100 ml-2 hover:text-opacity-75'>mangan_fb</a>
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </SearchProvider>
    )
}