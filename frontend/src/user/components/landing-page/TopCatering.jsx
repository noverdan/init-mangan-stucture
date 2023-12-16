import React, { useContext, useEffect, useState } from 'react';
import DefaulImg from '../../../assets/default-card-image.jpg'
import Card from '../../components/Card';
import LocalButton from '../Button';
const urlPackages = import.meta.env.VITE_URL_PACKAGES
import axios from 'axios';
import { PackagesContext } from '../../context/PackagesProvider';
import Rp from '../../../utils/Rupiah';
import { DataContext } from '../../context/ContextProvider';

function TopCatering() {
    const { packages, menus, reviews, errStatus } = useContext(PackagesContext);
    const { dataPackages, loadData } = useContext(DataContext)
    const [topPackages, setTopPackages] = useState([])
    console.log(topPackages)
    useEffect(() => {
        try {
            const sortPackages = dataPackages.sort((a, b) => b.terjual - a.terjual);
            setTopPackages(sortPackages.slice(0, 5))
        } catch (err) {
            console.log(err.message);
        }
    }, [dataPackages])

    return (
        <section className='flex flex-col justify-center items-center w-[360px] lg:w-full mx-auto lg:px-20 py-10'>
            <header className='font-semibold text-xl text-center text-primary-100'>Paket Katering Teratas</header>
            <div className='grid grid-cols-2 lg:flex gap-2 lg:gap-4 mt-7'>
                {topPackages.map(item => {
                    return (
                        <Card key={item.id} packageId={item.id} image={item.image_url} title={item.nama_produk} priceRange={item.range_harga} menuTotal={item.total_menu} rating={item.rating} sold={item.terjual} city={item["kotum.nama_kota"]} />
                    )
                })}
            </div>
            <div id="join"></div>
            <div className='mt-7 shadow-md'>
                <LocalButton name='Lebih Banyak' />
            </div>
        </section>
    )
}

export default TopCatering