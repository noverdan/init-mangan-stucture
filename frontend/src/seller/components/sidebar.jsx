import React from 'react'
import HomeSidebar from './atoms/sidebar/home-sidebar';
import PaketSidebar from './atoms/sidebar/paket-sidebar';
import ProfileSidebar from './atoms/sidebar/profile';
import PesananSidebar from './atoms/sidebar/pesanan-sidebar';
import PelangganSidebar from './atoms/sidebar/pelanggan-sidebar';
import PaymentSidebar from './atoms/sidebar/payment-sidebar';
import { NavLink } from 'react-router-dom';
import { Route, Routes } from "react-router-dom"

function Sidebar() {
    return (
        <div className='w-1/4 bg-[#005461] h-[100vh] overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
            <div className='py-3 px-8'>
                <img className='w-28 h-12 m-auto' src="/logo-mangan-white.svg" alt="" />
                <ProfileSidebar />
                <NavLink to="/home">
                    <HomeSidebar />
                </NavLink>
                <NavLink to="/products">
                    <PaketSidebar />
                </NavLink>
                <NavLink to="/pesanan">
                    <PesananSidebar />
                </NavLink>
                <NavLink to="/pelanggan">
                    <PelangganSidebar />
                </NavLink>
                <NavLink to="/payment">
                    <PaymentSidebar />
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
