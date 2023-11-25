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
        <div className='flex'>
            <div className={`flex items-start transition-all ease-in-out duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-1'}`}>
                {isOpen && <Sidebar />}
                <button className='z-20 w-0' onClick={toggleSidebar}>
                    <Hamburger color='#de283b' toggled={isOpen} toggle={setIsOpen} />
                </button>
                <ProductList />
            </div>

        </div>
    )
}

export default Products
