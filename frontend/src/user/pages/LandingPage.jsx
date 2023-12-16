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
import Loader from '../components/Loader';

function LandingPage() {
    const { loadData, authorization } = useContext(DataContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetchProfileUser(authorization)
            .then(() => {
                navigate("/homepage", { replace: true })
            })
            .catch((err) => {
                console.log(err);
            })
    }, [authorization])

    return (
        <>
            <Loader show={loadData} />
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
function fetchProfileUser(auth) {
    let config = {
        method: 'get',
        url: 'http://localhost:3000/users',
        headers: {
            'Authorization': auth
        }
    };
    return axios.request(config)
}