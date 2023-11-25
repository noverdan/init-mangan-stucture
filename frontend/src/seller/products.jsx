import React from 'react'
import Sidebar from './components/sidebar'
import ProductList from './components/atoms/products/product-list'


function Products() {
    return (
        <div className='flex'>
            <Sidebar />
            <ProductList />
        </div>
    )
}

export default Products
