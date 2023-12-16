import React, { useContext, useState } from 'react';
import { Carousel, Modal } from 'flowbite-react';
import NavbarUser from '../components/NavbarUser';
import { SearchProvider } from '../context/SearchProvider';
import { Icon } from '@iconify/react';
import { Dropdown } from 'flowbite-react';
import { useParams, useNavigate } from 'react-router-dom';
import stars1 from '../../assets/stars1.svg'
import stars2 from '../../assets/stars2.svg'
import stars3 from '../../assets/stars3.svg'
import stars4 from '../../assets/stars4.svg'
import stars5 from '../../assets/stars5.svg'
import { useEffect } from 'react';
import axios from 'axios';
import Rp from '../../utils/Rupiah';
import { DataContext } from '../context/ContextProvider';
import { PopUpAlert, PopUpQuestion } from '../components/PopUp';
import Loader from '../components/Loader';
const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenus = import.meta.env.VITE_URL_MENUS
const urlReviews = import.meta.env.VITE_URL_REVIEWS
const urlSellers = import.meta.env.VITE_URL_SELLERS

export default function Catering() {
    const { packageId } = useParams()
    const { isLoggedIn, authorization } = useContext(DataContext)
    const [token, setToken] = useState({})

    const [paket, setPaket] = useState({})
    const [menu, setMenu] = useState([])
    const [ulasan, setUlasan] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    console.log(paket);
    console.log(menu);

    const [selectedMenu, setSelectedMenu] = useState({})
    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [openQuestion, setOpenQuestion] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        fetchMenu(packageId)
            .then((res) => {
                setPaket(res.data.package)
                setMenu(res.data.package.menu)
            })
            .then(() => {
                fetchUlasan(packageId)
                    .then((res) => {
                        console.log(res.data.message);
                        setUlasan(res.data.ulasan)
                        setIsLoading(false)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }, [])

    function toCheckout() {
        if (selectedMenu.id) {
            setIsLoading(true)
            fetchUser(authorization)
                .then((res) => {
                    if (res.data.code === "SUCCESS") {
                        console.log("Berhasil ke CHECKOUT");
                        setIsLoading(false)
                    }
                    else {
                        setIsLoading(false)
                        setOpenQuestion(true)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false)
                    setOpenQuestion(true)
                })
            // const data = { idPackage: idPackage, idMenu: idMenu, idUser: idUser }
            // const dataString = JSON.stringify(data)
            // sessionStorage.setItem("stateCheckout", dataString)
            // navigate('/checkout')
            // window.scrollTo(0, 0)
        } else {
            setOpenAlert(true)
        }
    }
    function Ulasan() {
        return (
            <>
                <Modal size={"sm"} position={"center"} show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Ulasan</Modal.Header>
                    <Modal.Body>
                        {ulasan.map(item => {
                            return (
                                <ReviewContent key={item.id} user={item.user} tanggal={item.tanggal} bintang={item.bintang} ulasan={item.ulasan} />
                            )
                        })}
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    return (
        <>
            <SearchProvider>
                <NavbarUser />
            </SearchProvider>
            <main className='w-[360px] mx-auto py-16'>
                <section id='carousel' className=' mt-2'>
                    <button onClick={() => navigate(-1)} className='my-4 text-primary-100 font-semibold flex gap-1 items-center hover:font-bold'>
                        <Icon icon="ion:arrow-back-sharp" width={19} />
                        <p>Kembali</p>
                    </button>
                    <div className="w-full h-auto aspect-square">
                        <Carousel slide={false}>
                            <CarouselImage key={paket.id} image={paket.image_url} name='' />
                            {menu.map(item => {
                                return (
                                    <CarouselImage key={menu.id} image={item.image_url} name={item.nama_menu} />
                                )
                            })}
                        </Carousel>
                    </div>
                </section>
                <section id='details' className='mt-2'>
                    <h1 id='title' className='font-bold text-xl text-primary-100 leading-6'>{paket.nama_produk}</h1>{/* Nama Paket */}
                    <div className='flex gap-1 items-center font-semibold text-accent-200 my-1'>
                        <Icon icon="entypo:shop" width={18} />
                        <h4 id='seller' className=' '>{paket["usaha.nama_usaha"]}</h4>{/* Nama Toko */}
                        <p className='font-medium ml-auto text-sm flex items-center '>{paket["kotum.nama_kota"]}<Icon icon="mdi:location" /></p>{/* Lokasi Paket */}
                    </div>
                    <h1 id='title' className='font-bold text-lg text-accent-200 '>{selectedMenu.harga_menu ? Rp(selectedMenu.harga_menu) : paket.harga}</h1> {/* Harga Paket */}
                    <div className='flex items-center mb-2'>
                        <Icon icon="ph:star-fill" className='text-yellow-300' width={20} />
                        <p className='text-accent-200 font-medium ml-1'>{paket.rating}</p> {/* Rating Paket */}
                        <p className='text-accent-200 text-sm font-medium ml-3'>{paket.terjual} Terjual</p> {/* Paket Terjual */}
                    </div>
                    <Dropdown label="" renderTrigger={() => DownTrigger("Pilih Menu", selectedMenu.nama_menu)}> {/* Pilihan Menu */}
                        {menu.map(item => {
                            return (
                                <Dropdown.Item key={item.id} className="text-black" onClick={() => setSelectedMenu(menu.find(m => m.id == item.id))}>{item.nama_menu}</Dropdown.Item>
                            )
                        })}
                    </Dropdown>
                    <div className=''>{/* List isi Menu */}
                        <h1 className='text-accent-200 font-semibold mt-4'>Isi Menunya :</h1>
                        <ul className='grid grid-cols-2 ml-4 list-disc text-accent-200'>
                            {selectedMenu.id ?
                                <>
                                    <li>{selectedMenu.makanan_pokok}</li>
                                    <li>{selectedMenu.lauk}</li>
                                    <li>{selectedMenu.sayur}</li>
                                    <li>{selectedMenu.tambahan}</li>
                                </> : <li>Pilih Menu dulu...</li>}
                        </ul>
                    </div>
                    <div className='group'>{/* Deskripsi Paket */}
                        <h1 className='flex items-center gap-1 font-semibold text-accent-200 mt-4 cursor-pointer'>Deskripsi Paket :</h1>
                        <p className='text-sm text-justify text-accent-200'>{paket.deskripsi}</p>
                    </div>
                </section>
                <hr className='my-5 border-gray-300' />
                <section id='ulasan' className='mb-4'>
                    <div className='w-full p-4 border-gray-300 border rounded'>
                        <h1 className='text-center text-accent-200 font-medium'>{ulasan.length} Ulasan</h1>
                        {ulasan.slice(0, 2).map(item => {
                            return (
                                <ReviewContent key={item.id} user={item.user} tanggal={item.tanggal} bintang={item.bintang} ulasan={item.ulasan} />
                            )
                        })}
                        <hr className='my-2 border-gray-300' />
                        <h1 onClick={() => setOpenModal(true)} className='font-semibold text-center text-accent-200 underline cursor-pointer'>Lihat Lainya</h1>
                    </div>
                </section>
                <Ulasan />
            </main>
            <footer>
                <div className='w-full h-16 bg-white shadow-[0px_0px_10px_-5px_#000000] fixed bottom-0 z-[20]'>
                    <div className='w-[360px] h-full mx-auto flex gap-4 items-center'>
                        <button className='w-full bg-white text-primary-100 border border-primary-100 py-1 font-medium rounded hover:bg-gray-100 active:bg-white'>Hubungi Penjual</button>
                        <button onClick={() => toCheckout()} className='w-full bg-primary-100 border-primary-100 border text-white py-1 font-medium rounded hover:bg-opacity-70 active:bg-opacity-100 '>Beli</button>
                    </div>
                </div>
            </footer>
            <Loader show={isLoading} />
            <PopUpAlert isOpen={openAlert} message={"Pilih menu terlebih dahulu."} onClose={() => setOpenAlert(false)} onProcess={() => setOpenAlert(false)} />
            <PopUpQuestion isOpen={openQuestion} message={"Login Terlebih Dahulu."} onProcess={() => navigate("/login")} onCancel={() => setOpenQuestion(false)} onClose={() => setOpenQuestion(false)} />
        </>
    )
}

function ReviewContent({ user, tanggal, bintang, ulasan }) {
    let stars;

    switch (bintang) {
        case 1:
            stars = stars1
            break;
        case 2:
            stars = stars2
            break;
        case 3:
            stars = stars3
            break;
        case 4:
            stars = stars4
            break;
        case 5:
            stars = stars5
            break;
    }

    return (
        <>
            <hr className='my-2 border-gray-300' />
            <div className='flex items-center justify-between text-accent-200'>
                <p className=''>{user}</p>
                <p className='text-sm'>{tanggal}</p>
            </div>
            <img src={stars} alt="" className='my-1' />
            <p className='text-sm text-accent-200'>{ulasan}</p>
        </>
    )
}

function DownTrigger(placeholder, value) {
    return (
        <div className="flex items-center cursor-pointer border-[1.5px] px-2 border-primary-100 w-full rounded text-primary-100 md:w-full">
            <input type="text" placeholder={placeholder} value={value} readOnly
                className="px-0 h-7 cursor-pointer bg-transparent border-none w-full focus:ring-0 focus:border-primary-100 placeholder:text-black placeholder:text-opacity-40" />
            <Icon icon="ooui:next-ltr" className="text-primary-100 rotate-90" width={12} />
        </div>
    )
}

function CarouselImage({ image, name = "" }) {

    return (
        <div style={{ backgroundImage: `url(${image})` }} className="flex h-full items-center justify-center bg-cover bg-center bg-gray-200">
            <p className='absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-md text-accent-200 font-medium select-none border border-gray-300'>{name}</p>
        </div>
    )
}

function fetchMenu(idPaket) {
    const config = {
        method: 'GET',
        url: `http://localhost:3000/packages/${idPaket}`,
    }
    return axios.request(config)
}
function fetchUlasan(idPaket) {
    let config = {
        method: 'GET',
        url: `http://localhost:3000/ulasan/${idPaket}`
    };
    return axios.request(config)
}
function fetchUser(authorization) {
    const config = {
        method: 'GET',
        url: 'http://localhost:3000/users',
        headers: {
            'Authorization': `${authorization}`
        }
    };
    return axios.request(config)
}

