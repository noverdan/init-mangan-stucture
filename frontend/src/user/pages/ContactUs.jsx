import React from 'react';
import NavbarUser from '../components/NavbarUser';
import { SearchProvider } from '../context/SearchProvider';

export default function ContactUs() {

    return (
        <SearchProvider>
            <NavbarUser />
            <p>Contact Us</p>
        </SearchProvider>
    )
}