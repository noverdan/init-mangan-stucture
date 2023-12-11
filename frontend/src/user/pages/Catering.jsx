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
const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenus = import.meta.env.VITE_URL_MENUS
const urlReviews = import.meta.env.VITE_URL_REVIEWS
const urlSellers = import.meta.env.VITE_URL_SELLERS

export default function Catering() {
    const { packageId } = useParams()
    const { isLoggedIn } = useContext(DataContext)
    const [packageItem, setPackageItem] = useState({})
    const [menuItems, setMenuItems] = useState([])
    const [reviewItems, setReviewItems] = useState([])
    const [sellerItem, setSellerItem] = useState({})
    const [token, setToken] = useState({})

    const [selectedMenu, setSelectedMenu] = useState({
        id: null,
        nama: ""
    })
    const [hargaMenu, setHargaMenu] = useState("")
    const [isiMenu, setIsiMenu] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [openQuestion, setOpenQuestion] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getPackageById()
        getMenus()
        getReviews()
        setToken(JSON.parse(localStorage.getItem("token")))
    }, [])

    async function getPackageById() {
        await axios.get(`${urlPackages}/${packageId}`)
            .then(function (res) {
                setPackageItem(res.data)
                getSeller(res.data.idPenjual)
            })
            .catch(function (err) {
                const errMessage = err.message
                console.log(errMessage);
            });
    }
    async function getMenus() {
        await axios.get(`${urlMenus}?idPaket=${packageId}`)
            .then(function (res) {
                setMenuItems(res.data)
                rangeHarga(res.data)
            })
            .catch(function (err) {
                const errMessage = err.message
                console.log(errMessage);
            });
    }
    async function getSeller(idSeller) {
        await axios.get(`${urlSellers}/${idSeller}`)
            .then(function (res) {
                setSellerItem(res.data)
            })
            .catch(function (err) {
                const errMessage = err.message
                console.log(errMessage);
            });
    }
    async function getReviews() {
        await axios.get(`${urlReviews}?idPaket=${packageId}`)
            .then(function (res) {
                setReviewItems(res.data)
            })
            .catch(function (err) {
                const errMessage = err.message
                console.log(errMessage);
            });
    }
    function rangeHarga(menus) {
        const hargaTertinggi = Math.max(...menus.map(menu => menu.hargaMenu));
        const hargaTerendah = Math.min(...menus.map(menu => menu.hargaMenu));
        const harga = `${Rp(hargaTerendah)} - ${Rp(hargaTertinggi)}`
        setHargaMenu(harga)
    }
    function rating(review) {
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
    function setListMenu(id, nama, harga, isiMenu) {
        const menu = { id: id, nama: nama }
        setSelectedMenu(menu)
        setHargaMenu(Rp(harga))
        setIsiMenu(isiMenu)
    }
    function isChooseMenu() {
        if (selectedMenu.id) {
            return true
        } else {
            return false
        }
    }
    function toCheckout(idPackage, idMenu, idUser = 0) {
        if (!isLoggedIn) {
            setOpenQuestion(true)
            return
        }
        if (isChooseMenu()) {
            const data = { idPackage: idPackage, idMenu: idMenu, idUser: idUser }
            const dataString = JSON.stringify(data)
            sessionStorage.setItem("stateCheckout", dataString)
            navigate('/checkout')
            window.scrollTo(0, 0)
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
                        {reviewItems.map(item => {
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
                            <CarouselImage image={packageItem.gambarPaket} name='' />
                            {menuItems.map(item => {
                                const id = item.id
                                const name = item.namaMenu
                                const image = item.gambarMenu
                                return (
                                    <CarouselImage key={id} image={image} name={name} />
                                )
                            })}
                        </Carousel>
                    </div>
                </section>
                <section id='details' className='mt-2'>
                    <h1 id='title' className='font-bold text-xl text-primary-100 leading-6'>{packageItem.namaPaket}</h1>{/* Nama Paket */}
                    <div className='flex gap-1 items-center font-semibold text-accent-200 my-1'>
                        <Icon icon="entypo:shop" width={18} />
                        <h4 id='seller' className=' '>{sellerItem.nama}</h4>{/* Nama Toko */}
                        <p className='font-medium ml-auto text-sm flex items-center '>{packageItem.lokasiPaket}<Icon icon="mdi:location" /></p>{/* Lokasi Paket */}
                    </div>
                    <h1 id='title' className='font-bold text-lg text-accent-200 '>{hargaMenu}</h1> {/* Harga Paket */}
                    <div className='flex items-center mb-2'>
                        <Icon icon="ph:star-fill" className='text-yellow-300' width={20} />
                        <p className='text-accent-200 font-medium ml-1'>{rating(reviewItems)}</p> {/* Rating Paket */}
                        <p className='text-accent-200 text-sm font-medium ml-3'>{packageItem.paketTerjual} Terjual</p> {/* Paket Terjual */}
                    </div>
                    <Dropdown label="" renderTrigger={() => DownTrigger("Pilih Menu", selectedMenu.nama)}> {/* Pilihan Menu */}
                        {menuItems.map(item => {
                            const id = item.id
                            const name = item.namaMenu
                            const harga = item.hargaMenu
                            const isiMenu = item.isiMenu
                            return (
                                <Dropdown.Item key={id} className="text-black" onClick={() => setListMenu(id, name, harga, isiMenu)}>{name}</Dropdown.Item>
                            )
                        })}
                    </Dropdown>
                    <div className=''>{/* List isi Menu */}
                        <h1 className='text-accent-200 font-semibold mt-4'>Isi Menunya :</h1>
                        <ul className='grid grid-cols-2 ml-4 list-disc text-accent-200'>
                            {!isiMenu.length == 0 ? isiMenu.map((item, index) => <li key={index}>{item}</li>) : <li>Pilih menu dulu...</li>}
                        </ul>
                    </div>
                    <div className='group'>{/* Deskripsi Paket */}
                        <h1 className='flex items-center gap-1 font-semibold text-accent-200 mt-4 cursor-pointer'>Deskripsi Paket :</h1>
                        <p className='text-sm text-justify text-accent-200'>{packageItem.deskripsi}</p>
                    </div>
                </section>
                <hr className='my-5 border-gray-300' />
                <section id='ulasan' className='mb-4'>
                    <div className='w-full p-4 border-gray-300 border rounded'>
                        <h1 className='text-center text-accent-200 font-medium'>{reviewItems.length} Ulasan</h1>
                        {reviewItems.slice(0, 2).map(item => {
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
                        <button onClick={() => toCheckout(packageId, selectedMenu.id, token ? token.id : 0)} className='w-full bg-primary-100 border-primary-100 border text-white py-1 font-medium rounded hover:bg-opacity-70 active:bg-opacity-100 '>Beli</button>
                    </div>
                </div>
            </footer>
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

