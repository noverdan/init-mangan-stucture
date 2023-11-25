import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/landing-page/Hero';
import AboutUs from '../components/landing-page/AboutUs';
import EaseOrdering from '../components/landing-page/EaseOrdering';
import Area from '../components/landing-page/Area';
import TopCatering from '../components/landing-page/TopCatering';
import Join from '../components/landing-page/Join';

function LandingPage() {

    return (
        <>
            <Navbar />
            <main className='bg-[url("https://svgshare.com/i/xpr.svg")] w-full bg-repeat-y' style={{ backgroundPositionY: '76%' }}>
                <Hero />
                <hr className='mx-72 border border-bg-300 border-opacity-70' />
                <EaseOrdering />
                <hr className='mx-72 border border-bg-300 border-opacity-70' />
                <AboutUs />
                <hr className='mx-72 border border-bg-300 border-opacity-70 mb-10' />
                <Area />
                <hr className='mx-72 border border-bg-300 border-opacity-70' />
                <TopCatering />
                <hr className='mx-72 border border-bg-300 border-opacity-70' />
                <Join />
            </main>
            <Footer />
        </>
    )
}
export default LandingPage