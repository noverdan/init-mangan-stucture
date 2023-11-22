import React from 'react';
import DefaulImg from '../../../assets/default-card-image.jpg'
import Card from '../../components/Card';
import LocalButton from '../Button';


function TopCatering() {
    return (
        <section className='flex flex-col justify-center items-center px-20 py-10'>
            <header className='font-semibold text-xl text-center text-primary-100'>Paket Katering Teratas</header>
            <div className='flex gap-4 mt-7'>
                <Card image={DefaulImg} title='Paket Menu Nasi Box Ayam' priceRange='Rp20.000 - Rp40.000' menuTotal={5} rating={4.5} sold={10} city='Kota Jakarta' />
                <Card image={DefaulImg} title='Paket Menu Nasi Box Ayam' priceRange='Rp20.000 - Rp40.000' menuTotal={5} rating={4.5} sold={10} city='Kota Jakarta' />
                <Card image={DefaulImg} title='Paket Menu Nasi Box Ayam' priceRange='Rp20.000 - Rp40.000' menuTotal={5} rating={4.5} sold={10} city='Kota Jakarta' />
                <Card image={DefaulImg} title='Paket Menu Nasi Box Ayam' priceRange='Rp20.000 - Rp40.000' menuTotal={5} rating={4.5} sold={10} city='Kota Jakarta' />
                <Card image={DefaulImg} title='Paket Menu Nasi Box Ayam' priceRange='Rp20.000 - Rp40.000' menuTotal={5} rating={4.5} sold={10} city='Kota Jakarta' />
            </div>
            <div className='mt-7 shadow-md'>
                <LocalButton name='Lebih Banyak' />
            </div>
        </section>
    )
}

export default TopCatering