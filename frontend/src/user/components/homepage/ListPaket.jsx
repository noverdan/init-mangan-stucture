import React, { useContext, useEffect, useState } from 'react';
import Card from '../Card';
import Rp from '../../../utils/Rupiah';
import { SearchContext } from '../../context/SearchProvider';
import { PackagesContext } from '../../context/PackagesProvider';
import { Icon } from '@iconify/react';
import { FilterContext } from '../../context/FilterProvider';

export default function ListPaket() {
    const { packages, menus, reviews, errStatus } = useContext(PackagesContext);
    const { filter, setFilter } = useContext(FilterContext)

    const [packagesList, setPackagesList] = useState([])
    const { searchParam } = useContext(SearchContext)

    useEffect(() => {
        if (searchParam) {
            const searchInput = searchParam.split(" ")
            const searchWords = searchInput.filter(item => item !== "")
            const searchResult = packages.filter(packageItem => {
                let namaLower = packageItem.namaPaket.toLowerCase()
                return searchWords.every(keyword => namaLower.includes(keyword.toLowerCase()));
            });
            setPackagesList(searchResult);
        } else {
            setPackagesList(packages)
        }
    }, [packages, searchParam])

    useEffect(() => {
        let kota = filter.kota
        let kategori = filter.kategori

        if (kota && kategori) {
            const filteredPackages = packages.filter(packageItem =>
                packageItem.lokasiPaket.toLowerCase() === kota.toLowerCase() && packageItem.kategori.toLowerCase() === kategori.toLowerCase()
            );
            setPackagesList(filteredPackages)
        } else if (kota) {
            const filteredPackages = packages.filter(packageItem =>
                packageItem.lokasiPaket.toLowerCase() === kota.toLowerCase()
            );
            setPackagesList(filteredPackages)
        } else if (kategori) {
            const filteredPackages = packages.filter(packageItem =>
                packageItem.kategori.toLowerCase() === kategori.toLowerCase()
            );
            setPackagesList(filteredPackages)
        } else {
            setPackagesList(packages)
        }

    }, [filter])

    if (!packagesList.length == 0) {
        return (
            <section className='my-4'>
                <div className="w-[360px] mx-auto grid gap-2 grid-cols-2 md:grid-cols-3 md:px-32 md:w-full lg:px-20 lg:grid-cols-5 lg:gap-3">
                    {
                        packagesList.map(packageItem => {
                            const rangeHarga = () => {
                                const menu = menus.filter(packageMenu => packageMenu.idPaket == packageItem.id);
                                const hargaTertinggi = Math.max(...menu.map(menu => menu.hargaMenu));
                                const hargaTerendah = Math.min(...menu.map(menu => menu.hargaMenu));
                                return `${Rp(hargaTerendah)} - ${Rp(hargaTertinggi)}`
                            }

                            const totalMenu = () => {
                                const menu = menus.filter(packageMenu => packageMenu.idPaket == packageItem.id);
                                const total = menu.length
                                return `${total} Menu`
                            }

                            const rating = () => {
                                const review = reviews.filter(packageReview => packageReview.idPaket == packageItem.id);
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
                                <Card key={packageItem.id} packageId={packageItem.id} image={packageItem.gambarPaket} title={packageItem.namaPaket} priceRange={rangeHarga()} menuTotal={totalMenu()} rating={rating()} sold={packageItem.paketTerjual} city={packageItem.lokasiPaket} />
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