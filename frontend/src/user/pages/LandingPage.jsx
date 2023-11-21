import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LandingPage() {
    return (
        <>
            <Navbar />
            <h1 className="font-bold text-2xl text-red-900 m-10">Welcome to Mangan</h1>
            <Footer />
        </>
    )
}
export default LandingPage