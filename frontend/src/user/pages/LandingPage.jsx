import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/landing-page/Hero';
import AboutUs from '../components/landing-page/AboutUs';
import EaseOrdering from '../components/landing-page/EaseOrdering';
import Area from '../components/landing-page/Area';
import TopCatering from '../components/landing-page/TopCatering';
import Join from '../components/landing-page/Join';
import { DataContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
    const { isLoggedIn } = useContext(DataContext)
    const navigate = useNavigate()

    if (isLoggedIn) {
        navigate("/homepage", { replace: true })
        return
    }

    return (
        <>
            <Navbar />
            <main className='lg:bg-[url("https://svgshare.com/i/xpr.svg")] bg-white max-w-full w-full bg-repeat-y' style={{ backgroundPositionY: '76%' }}>
                <Hero />
                <hr className=' mx-auto w-[360px] lg:w-full border border-bg-300 border-opacity-70' />
                <EaseOrdering />
                <hr className=' mx-auto w-[360px] lg:w-full border border-bg-300 border-opacity-70' />
                <AboutUs />
                <hr className=' mx-auto w-[360px] lg:w-full border border-bg-300 border-opacity-70 mb-10' />
                <Area />
                <hr className=' mx-auto w-[360px] lg:w-full border border-bg-300 border-opacity-70' />
                <TopCatering />
                <hr className=' mx-auto w-[360px] lg:w-full border border-bg-300 border-opacity-70' />
                <Join />
            </main>
            <Footer />
        </>
    )
}
export default LandingPage