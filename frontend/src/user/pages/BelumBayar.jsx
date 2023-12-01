import React from 'react';
import { SearchProvider } from '../context/SearchProvider';
import NavbarUser from '../components/NavbarUser';

export default function BelumBayar() {
    return (
        <SearchProvider>
            <NavbarUser />
        </SearchProvider>
    )
}