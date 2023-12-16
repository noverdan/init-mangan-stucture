import React, { useContext, useEffect, useState } from 'react';
import Card from '../Card';
import Rp from '../../../utils/Rupiah';
import { SearchContext } from '../../context/SearchProvider';
import { PackagesContext } from '../../context/PackagesProvider';
import { Icon } from '@iconify/react';
import { FilterContext } from '../../context/FilterProvider';
import { DataContext } from '../../context/ContextProvider';

export default function ListPaket() {
    const { dataPackages } = useContext(DataContext)
    const { packages, menus, reviews, errStatus } = useContext(PackagesContext);
    const { filter, setFilter } = useContext(FilterContext)

    const [packagesList, setPackagesList] = useState(dataPackages)
    const { searchParam } = useContext(SearchContext)

    useEffect(() => {
        if (searchParam) {
            const searchInput = searchParam.split(" ")
            const searchWords = searchInput.filter(item => item !== "")
            const searchResult = dataPackages.filter(packageItem => {
                let namaLower = packageItem.nama_produk.toLowerCase()
                return searchWords.every(keyword => namaLower.includes(keyword.toLowerCase()));
            });
            setPackagesList(searchResult);
        } else {
            setPackagesList(dataPackages)
        }
    }, [dataPackages, searchParam])

    useEffect(() => {
        let kota = filter.kota
        let kategori = filter.kategori

        if (kota && kategori) {
            const filteredPackages = dataPackages.filter(packageItem =>
                packageItem["kotum.nama_kota"].toLowerCase() === kota.toLowerCase() && packageItem["kategori_produk.kategori"].toLowerCase() === kategori.toLowerCase()
            );
            setPackagesList(filteredPackages)
        } else if (kota) {
            const filteredPackages = dataPackages.filter(packageItem =>
                packageItem["kotum.nama_kota"].toLowerCase() === kota.toLowerCase()
            );
            setPackagesList(filteredPackages)
        } else if (kategori) {
            const filteredPackages = dataPackages.filter(packageItem =>
                packageItem["kategori_produk.kategori"].toLowerCase() === kategori.toLowerCase()
            );
            setPackagesList(filteredPackages)
        } else {
            setPackagesList(dataPackages)
        }

    }, [filter])

    if (!packagesList.length == 0) {
        return (
            <section className='my-4'>
                <div className="w-[360px] mx-auto grid gap-2 grid-cols-2 md:grid-cols-3 md:px-32 md:w-full lg:px-20 lg:grid-cols-5 lg:gap-3">
                    {
                        packagesList.map(packageItem => {
                            return (
                                <Card key={packageItem.id} packageId={packageItem.id} image={packageItem.image_url} title={packageItem.nama_produk} priceRange={packageItem.range_harga} menuTotal={packageItem.total_menu} rating={packageItem.rating} sold={packageItem.terjual} city={packageItem["kotum.nama_kota"]} />
                            )
                        })
                    }
                </div>

            </section>
        )
    } else {
        if (errStatus) {
            return (
                <section className='my-4 w-[360px] mx-auto'>
                    <div className='w-full py-10 '>
                        <Icon icon="tabler:mood-empty" className='text-primary-100 mx-auto' width={125} />
                        <p className='text-primary-100 text-xl font-bold text-center'>Ups..</p>
                        <p className='text-primary-100 font-semibold text-center'>{errStatus}</p>
                    </div>
                </section>
            )
        }
        return (
            <section className='my-4 w-[360px] mx-auto'>
                <div className='w-full py-10 '>
                    <Icon icon="tabler:mood-empty" className='text-primary-100 mx-auto' width={125} />
                    <p className='text-primary-100 text-xl font-bold text-center'>Ups..</p>
                    <p className='text-primary-100 font-semibold text-center'>Katering yang anda cari tidak ada</p>
                    <p className='text-accent-200 text-center'>Coba gunakan kata kunci lainya</p>
                </div>
            </section>
        )
    }
}