import React, { createContext, useState } from 'react'

export const ProductContext = createContext()

function ProductProvider({ children }) {
    const [product, setProduct] = useState([
        { id: 1, name: 'Product 1', price: 100, quantity: 10 },
    ])

    return (
        <ProductContext.Provider value={{ product, setProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider
