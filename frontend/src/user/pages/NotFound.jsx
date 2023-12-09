import React from 'react';
import mascotMurka from '../../assets/mascot-murka.png'
import NavbarUser from '../components/NavbarUser';
import { SearchProvider } from '../context/SearchProvider';

export default function NotFound() {

    return (
        <>
            <SearchProvider>
                <NavbarUser />
            </SearchProvider>
            <main className='w-[360px] mx-auto h-screen flex flex-col justify-center'>
                <img src={mascotMurka} alt="" className='w-52 mx-auto object-contain' />
                <h1 className='font-bold text-center text-primary-100 text-4xl'>404</h1>
                <h1 className='font-bold text-center text-accent-200'>Mohon maaf halaman yang dituju tidak ditemukan.</h1>
            </main>
        </>
    )
}