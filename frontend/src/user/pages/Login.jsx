import React from 'react';
import { Icon } from '@iconify/react';
import Mascot from '../../assets/mascot-sip.png'
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    function goBack() {
        navigate(-1)
    }
    return (
        <main className="mx-auto w-[360px] py-5">
            <div>
                <div className='flex justify-between'>
                    <button onClick={goBack} className="flex items-center text-primary-100 font-bold hover:text-primary-200 active:text-primary-100"><span><Icon icon="ic:baseline-arrow-back-ios" /></span>Kembali</button>
                </div>
                <header>
                    <p className='mt-4 font-bold text-primary-100 text-lg text-center'>Selamat Datang</p>
                    <p className='font-medium text-accent-200 text-center'>Masuk ke akun kamu yang sudah terdaftar</p>
                    <form className='mt-4'>
                        <label className="font-medium text-primary-100" htmlFor="email">Email</label>
                        <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                            <label className="flex items-center h-fit" htmlFor="email"><Icon icon="ic:round-email" className="text-primary-100" /></label>
                            <input className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40 " id="email" type="email" placeholder="example@mail.com" />
                        </div>
                        <label className="font-medium text-primary-100" htmlFor="password">Password</label>
                        <div className="flex w-full mb-1 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                            <label className="flex items-center h-fit" htmlFor="password"><Icon icon="mdi:password" className="text-primary-100" /></label>
                            <input className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="password" type="password" placeholder="Password" />
                        </div>
                        <a href="" className='font-medium text-sm text-primary-100 hover:text-primary-200 active:text-primary-100'>Lupa Password?</a>
                        <button onClick={() => navigate('/homepage')} className="w-full py-2 rounded-md mt-4 font-medium bg-primary-100 text-white hover:bg-primary-200 active:bg-primary-100" type="submit">Login</button>
                    </form>
                    <div className="flex gap-2 mt-4">
                        <p className="font-medium text-accent-200 text-sm">Belum punya akun?</p>
                        <a href='/register' className="font-bold text-sm text-primary-100 hover:text-primary-200 active:text-primary-100">Daftar</a>
                    </div>
                </header>
            </div>
            <div>
                <img src={Mascot} alt="" className='hidden' />
            </div>
        </main>
    )
}
export default Login