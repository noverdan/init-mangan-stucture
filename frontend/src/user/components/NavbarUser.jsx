import LogoMangan from '/logo-mangan.svg'
import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import Hamburger from 'hamburger-react'
import { DataContext } from '../context/ContextProvider';
import UserMenu from './modal/UserMenu';
import { SearchContext } from '../context/SearchProvider';


function NavbarUser() {
    const { isModalOpen, setModalOpen } = useContext(DataContext)
    const { isSearch, setSearch, setSearchParam } = useContext(SearchContext)

    const [inputSearch, setInputSearch] = useState("")

    function openMenu() {
        if (isModalOpen) {
            setModalOpen(false)
        } else if (!isModalOpen) {
            setModalOpen(true)
        }
    }

    function openSearch() {
        if (!isSearch) {
            setSearch(true)
        } else if (isSearch) {
            setSearch(false)
        }
    }

    function goSearch() {
        setSearchParam(inputSearch)
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            goSearch();
        }
    };

    return (
        <>
            <header className='flex justify-center md:px-20 w-full shadow-md h-16 bg-white fixed top-0 z-20'>
                <SearchInput />
                <div className='flex items-center justify-between md:justify-normal w-[360px] md:w-full '>
                    <nav className='flex gap-24 h-full items-center'>
                        <img src={LogoMangan} alt="" className='w-24 lg:w-28' />
                        <div className='hidden xl:flex gap-10 '>
                            <span>
                                <a href="/homepage"
                                    className='font-bold text-primary-100 hover:text-opacity-50 active:text-primary-100'>Homepage</a>
                            </span>
                            <span>
                                <div className='group'>
                                    <div className='flex gap-1 items-center cursor-pointer'>
                                        <p className='font-bold text-primary-100 text-opacity-50 group-hover:text-opacity-100 active:text-primary-100'>Pesanan</p>
                                        <Icon icon='mingcute:down-line' className='mt-1 text-primary-100 text-opacity-50 group-hover:text-opacity-100 group-hover:rotate-180 transition-all' width={19} />
                                    </div>
                                    <div>
                                        <div className='hidden group-hover:block absolute py-2'>
                                            <div className='group-hover:flex group-hover:flex-col w-52 rounded shadow-xl border-primary-100 border border-opacity-30 bg-white'>
                                                <a href="" className='text-primary-100 font-medium px-6 py-3 hover:font-semibold'>Belum Bayar</a>
                                                {/* <hr className='border-primary-100 border-opacity-20 mx-2' /> */}
                                                <a href="" className='text-primary-100 font-medium px-6 py-3 hover:font-semibold'>Diproses</a>
                                                {/* <hr className='border-primary-100 border-opacity-20 mx-2' /> */}
                                                <a href="" className='text-primary-100 font-medium px-6 py-3 hover:font-semibold'>Selesai</a>
                                                {/* <hr className='border-primary-100 border-opacity-20 mx-2' /> */}
                                                <a href="" className='text-primary-100 font-medium px-6 py-3 hover:font-semibold'>Dibatalkan</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <span>
                                <a href="/homepage"
                                    className='font-bold text-primary-100 text-opacity-50 hover:text-opacity-100 active:text-primary-100'>Hubungi Kami</a>
                            </span>
                        </div>
                    </nav>
                    <div className='hidden md:flex gap-8  items-center md:ml-auto'>
                        <div className='flex items-center'>
                            <div className="hidden md:flex w-72 px-2 items-center rounded-l-md border-2 border-primary-100 ">
                                <label className="flex items-center h-fit" htmlFor="search"><Icon icon="ion:search-sharp" className='text-primary-100' /></label>
                                <input onChange={(event) => { setInputSearch(event.target.value) }} onKeyDown={handleKeyPress} value={inputSearch}
                                    className="px-0 pl-2 w-full h-8 border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40 " id="search" type="search" placeholder="Cari..." />
                            </div>
                            <button onClick={goSearch}
                                className='bg-primary-100 h-9 rounded-r-md px-2 hover:bg-primary-200 active:bg-primary-100'><Icon icon="ooui:next-ltr" className='text-white' /></button>
                        </div>
                        <div className='hidden group xl:flex bg-cover bg-center w-10 aspect-square rounded-full cursor-pointer group hover:ring-2 hover:ring-primary-100 hover:ring-opacity-75' style={{ backgroundImage: `url(${'https://img.freepik.com/psd-premium/avatar-dessin-anime-homme-arabe-rendu-3d-fond-bleu-icone-3d-illustration-isolee_460336-1948.jpg'})` }}>
                            <div className='hidden group-hover:block absolute py-11 right-20'>
                                <div className='w-64 bg-white border border-primary-200 shadow-lg p-4 rounded-md'>
                                    <div className='flex gap-4 items-center mb-3 w-full cursor-pointer text-primary-100 hover:text-opacity-60'> {/* Profile */}
                                        <div className='bg-gray-300 w-12 h-12 rounded-full'></div>
                                        <div className='w-40'>
                                            <p className='select-none font-semibold overflow-hidden text-ellipsis whitespace-nowrap hover:text-opacity-50'>John Doe Sumanggala Putrsa Samsudin</p>
                                            <div className='flex items-center gap-2'>
                                                <p className='select-none text-xs hover:text-opacity-50'>Profil</p>
                                                <Icon icon="ooui:next-ltr" className='hover:text-opacity-50' width={8} />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='my-2 border-primary-100 border-opacity-30' />
                                    <div className='cursor-pointer text-primary-100 hover:text-opacity-60'>{/* Chat */}
                                        <div className='flex items-center gap-4'>
                                            <Icon icon="bx:chat" className='' width={19} />
                                            <p className='select-none font-medium'>Chat</p>
                                        </div>
                                    </div>
                                    <hr className='my-2 border-primary-100 border-opacity-30 ' />
                                    <div className='cursor-pointer text-primary-100 hover:text-opacity-60'>{/* Logout */}
                                        <div className='flex items-center gap-4'>
                                            <Icon icon="material-symbols:logout-sharp" className='' width={19} />
                                            <p className='select-none font-medium'>Logout</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 md:ml-4 xl:hidden'>
                        <button className='md:hidden' onClick={openSearch}><Icon icon="ion:search-sharp" className='text-primary-100 hover:text-opacity-60' width={21} /></button>
                        <Hamburger onToggle={openMenu} color='#de283b' size={25} />
                    </div>
                </div>
            </header>
            <UserMenu />
        </>

    )
}
export default NavbarUser

function SearchInput() {
    const { isSearch, setSearch, setSearchParam } = useContext(SearchContext)
    const [inputSearch, setInputSearch] = useState("")

    function openSearch() {
        if (!isSearch) {
            setSearch(true)
        } else if (isSearch) {
            setSearch(false)
        }
    }
    function show() {
        const style = 'flex justify-center xl:px-20 w-full h-16 bg-white fixed top-0 z-20'
        if (isSearch) {
            return "flex " + style
        }
        if (!isSearch) {
            return "hidden " + style
        }
    }
    function goSearch() {
        setSearchParam(inputSearch)
        setSearch(false)
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            goSearch();
        }
    };

    return (
        <header className={show()}>
            <div className='flex justify-center items-center gap-2 py-3 w-[360px]'>
                <button onClick={openSearch}>
                    <Icon icon="material-symbols:arrow-back" className='text-primary-100' width={25} />
                </button>
                <div className="flex bg-white w-full pl-2 items-center rounded-md border border-primary-100 ring-1 ring-primary-100">
                    <input onChange={(event) => { setInputSearch(event.target.value) }} onKeyDown={handleKeyPress} value={inputSearch}
                        className="px-2 w-full h-8 border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40 " id="search" type="search" placeholder="Cari..." />
                    <button onClick={goSearch} className='bg-primary-100 px-2 h-8 text-white rounded-r-sm hover:bg-primary-200'><Icon icon="ion:search-sharp" className='text-white' /></button>
                </div>
            </div>
        </header >

    )
}
