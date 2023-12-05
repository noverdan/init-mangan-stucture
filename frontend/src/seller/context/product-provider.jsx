import React, { createContext, useState } from 'react'

export const ProductContext = createContext()

function ProductProvider({ children }) {
    const [product, setProduct] = useState([
        {
            id: 1,
            image: 'https://picsum.photos/200/300',
            menu: [
                { id: 1, nameMenu: 'menu 1', price: 10000, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 2, nameMenu: 'menu 2', price: 10000, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 3, nameMenu: 'menu 3', price: 10000, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
            ],
        }
    ]);


    return (
        <ProductContext.Provider value={{ product, setProduct }}>
            {children}
        </ProductContext.Provider >
    )
}

export default ProductProvider
