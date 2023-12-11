import React, { useContext, useEffect, useState } from 'react';
import DefaulImg from '../../../assets/default-card-image.jpg'
import Card from '../../components/Card';
import LocalButton from '../Button';
const urlPackages = import.meta.env.VITE_URL_PACKAGES
import axios from 'axios';
import { PackagesContext } from '../../context/PackagesProvider';
import Rp from '../../../utils/Rupiah';

function TopCatering() {
    const { packages, menus, reviews, errStatus } = useContext(PackagesContext);
    const [topPackages, setTopPackages] = useState([])
    console.log(topPackages)
    useEffect(() => {
        const data = packages.sort((a, b) => b.paketTerjual - a.paketTerjual);
        setTopPackages(data.slice(0, 5))
    }, [packages])

    return (
        <section className='flex flex-col justify-center items-center w-[360px] lg:w-full mx-auto lg:px-20 py-10'>
            <header className='font-semibold text-xl text-center text-primary-100'>Paket Katering Teratas</header>
            <div className='grid grid-cols-2 lg:flex gap-2 lg:gap-4 mt-7'>
                {topPackages.map(item => {
                    const rangeHarga = () => {
                        const menu = menus.filter(packageMenu => packageMenu.idPaket == item.id);
                        const hargaTertinggi = Math.max(...menu.map(menu => menu.hargaMenu));
                        const hargaTerendah = Math.min(...menu.map(menu => menu.hargaMenu));
                        return `${Rp(hargaTerendah)} - ${Rp(hargaTertinggi)}`
                    }

                    const totalMenu = () => {
                        const menu = menus.filter(packageMenu => packageMenu.idPaket == item.id);
                        const total = menu.length
                        return `${total}`
                    }

                    const rating = () => {
                        const review = reviews.filter(packageReview => packageReview.idPaket == item.id);
                        const bintang = review.map(review => review.bintang);
                        const jumlahBintang = bintang.length
                        if (jumlahBintang) {
                            const totalBintang = bintang.reduce((acc, nilai) => acc + nilai, 0);
                            const rataBintang = totalBintang / jumlahBintang
                            const rating = rataBintang.toFixed(1);
                            return rating
                        } else if (!jumlahBintang) {
                            return ""
                        } else {
                            return ""
                        }
                    }
                    return (
                        <Card packageId={item.id} image={item.gambarPaket} title={item.namaPaket} priceRange={rangeHarga()} menuTotal={totalMenu()} rating={rating()} sold={item.paketTerjual} city={item.lokasiPaket} />
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