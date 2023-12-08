import React, { createContext, useState } from 'react'

export const ProductContext = createContext()

function ProductProvider({ children }) {
    const [product, setProduct] = useState([
        {
            id: 1,
            image: 'https://picsum.photos/200/300',
            namaPaket: 'Paket 1',
            menu: [
                { id: 1, image: 'https://picsum.photos/200/300', nameMenu: 'menu 1', price: 10000, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 2, image: 'https://picsum.photos/200/300', nameMenu: 'menu 2', price: 100, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 3, image: 'https://picsum.photos/200/300', nameMenu: 'menu 3', price: 100, makananPokok: "pecel Lee", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
            ],
        },
        {
            id: 2,
            image: 'https://picsum.photos/200/300',
            namaPaket: 'Paket 2',
            menu: [
                { id: 1, image: 'https://picsum.photos/200/300', nameMenu: 'menu 1', price: 10000, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 2, image: 'https://picsum.photos/200/300', nameMenu: 'menu 2', price: 100, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 3, image: 'https://picsum.photos/200/300', nameMenu: 'menu 3', price: 100, makananPokok: "pecel Lee", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
            ],
        },
        {
            id: 3,
            image: 'https://picsum.photos/200/300',
            namaPaket: 'Paket 3',
            menu: [
                { id: 1, image: 'https://picsum.photos/200/300', nameMenu: 'menu 1', price: 10000000, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 2, image: 'https://picsum.photos/200/300', nameMenu: 'menu 2', price: 100, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 3, image: 'https://picsum.photos/200/300', nameMenu: 'menu 3', price: 100, makananPokok: "pecel Lee", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 3, image: 'https://picsum.photos/200/300', nameMenu: 'menu 3', price: 100, makananPokok: "pecel Lee", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
            ],
        },
        {
            id: 4,
            image: 'https://picsum.photos/200/300',
            namaPaket: 'Paket 4',
            menu: [
                { id: 1, image: 'https://picsum.photos/200/300', nameMenu: 'menu 1', price: 10000, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 2, image: 'https://picsum.photos/200/300', nameMenu: 'menu 2', price: 100, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 3, image: 'https://picsum.photos/200/300', nameMenu: 'menu 3', price: 100, makananPokok: "pecel Lee", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
            ],
        },
        {
            id: 5,
            image: 'https://picsum.photos/200/300',
            namaPaket: 'Paket 5',
            menu: [
                { id: 1, image: 'https://picsum.photos/200/300', nameMenu: 'menu 1', price: 10000, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 2, image: 'https://picsum.photos/200/300', nameMenu: 'menu 2', price: 100, makananPokok: "pecel Lele", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
                { id: 3, image: 'https://picsum.photos/200/300', nameMenu: 'menu 3', price: 100, makananPokok: "pecel Lee", sayuran: "sayur lodeh", lauk: "ayam goreng", tambahan1: "kecap" },
            ],
        },
    ]);


    return (
        <ProductContext.Provider value={{ product, setProduct }}>
            {children}
        </ProductContext.Provider >
    )
}

export default ProductProvider
