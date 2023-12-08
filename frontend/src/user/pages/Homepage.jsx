import { useContext, useState } from "react";
import NavbarUser from "../components/NavbarUser";
import { FilterContext } from "../context/FilterProvider";
import { SearchProvider } from "../context/SearchProvider";
import { Icon } from '@iconify/react';
import { Dropdown } from 'flowbite-react';
import Footer from "../components/Footer";
import ListPaket from "../components/homepage/ListPaket";
import { PackagesProvider } from "../context/PackagesProvider";
import HomepageImage from '../../assets/homepage-image.jpg'
import axios from "axios";
import { useAsyncError } from "react-router-dom";
import { DataContext } from "../context/ContextProvider";
import Loader from "../components/Loader";


export default function Homepage() {
    const { isLoggedIn, setIsLoggedIn, loadData, setLoadData } = useContext(DataContext)
    console.log("Load : " + loadData);
    console.log("isLoggedIn : " + isLoggedIn);
    const { filter, setFilter } = useContext(FilterContext)
    const image = "https://source.unsplash.com/random/500x500/?food"

    const [selectedKota, setSelectedKota] = useState("")
    const [selectedKategori, setSelectedKategori] = useState("")

    function terapkanFilter() {
        setFilter({
            kota: selectedKota,
            kategori: selectedKategori
        })

    }
    return (
        <SearchProvider>
            <NavbarUser />

            <main className="pt-16">
                <section className="hidden lg:flex">
                    <div className="w-full h-[300px] bg-cover bg-center" style={{ backgroundImage: `url(${HomepageImage})` }}>
                        <div className="flex flex-col justify-center w-full bg-black h-full bg-opacity-30">
                            <p className=" font-bold text-white text-center text-3xl" style={{ textShadow: '5px 7px 5px #00000086' }}>Paket Katering Untuk Anda</p>
                        </div>
                    </div>
                </section>
                <section id="filter-section" className="w-[360px] flex gap-2 justify-center items-center mx-auto my-4 md:w-full md:px-20 lg:gap-5 lg:px-40">
                    <Icon icon="uil:filter" className="text-primary-100 text-lg md:text-5xl" />
                    <Dropdown label="" renderTrigger={() => DownTrigger("Kota", selectedKota)}>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKota("")} >Kosongkan</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKota("Jakarta")} >Jakarta</Dropdown.Item>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKota("Bekasi")} >Bekasi</Dropdown.Item>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKota("Bandung")}>Bandung</Dropdown.Item>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKota("Purwokerto")} >Purwokerto</Dropdown.Item>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKota("Semarang")} >Semarang</Dropdown.Item>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKota("Yogyakarta")} >Yogyakarta</Dropdown.Item>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKota("Surabaya")} >Surabaya</Dropdown.Item>
                    </Dropdown>
                    <Dropdown label="" renderTrigger={() => DownTrigger("Kategori", selectedKategori)}>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKategori("")} >Kosongkan</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKategori("Prasmanan")} >Prasmanan</Dropdown.Item>
                        <Dropdown.Item className="text-black" onClick={() => setSelectedKategori("Box")}>Box</Dropdown.Item>
                    </Dropdown>
                    <button onClick={terapkanFilter} className="font-semibold text-sm underline text-primary-100">Terapkan</button>
                </section>
                <hr className="w-[360px] mx-auto border border-primary-100 border-opacity-30 md:w-[70%]" />
                <ListPaket />
            </main>
            <Footer />
            <Loader show={loadData} />
        </SearchProvider>
    )
}

function DownTrigger(placeholder, value) {
    return (
        <div className="flex items-center cursor-pointer border-[1.5px] px-2 border-primary-100 w-32 rounded text-primary-100 md:w-full">
            <input type="text" placeholder={placeholder} value={value} readOnly
                className="px-0 h-7 cursor-pointer bg-transparent border-none w-full focus:ring-0 focus:border-primary-100 placeholder:text-black placeholder:text-opacity-40" />
            <Icon icon="ooui:next-ltr" className="text-primary-100 rotate-90" width={12} />
        </div>
    )
}