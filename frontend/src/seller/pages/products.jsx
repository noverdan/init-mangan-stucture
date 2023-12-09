import React, { useState } from 'react'
import ProductList from '../components/atoms/products/product-list'
import Hamburger from 'hamburger-react';
import Sidebar from '../components/sidebar';

function Products() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className={`flex items-start bg-bg-300 h-screen overflow-auto transition-all ease-in-out duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-1'}`}>
            {isOpen && <Sidebar />}
            <button className='z-20 hover:bg-bg-300 rounded-full transition-colors ' onClick={toggleSidebar}>
                <Hamburger size={20} easing="ease-in" color='black' toggled={isOpen} toggle={setIsOpen} />
            </button>
            <ProductList />
        </div >
    )
}

export default Products
