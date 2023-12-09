import React, { useEffect, useState } from 'react';
import { SearchProvider } from '../context/SearchProvider';
import NavbarUser from '../components/NavbarUser';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import mascotError from "../../assets/mascot-murka.png";
import copy from 'clipboard-copy'
import Rp from '../../utils/Rupiah';

const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenus = import.meta.env.VITE_URL_MENUS
const urlUser = import.meta.env.VITE_URL_USER
const urlSeller = import.meta.env.VITE_URL_SELLERS
const urlPesanan = import.meta.env.VITE_URL_ORDERS
const urlPaymentStatus = "https://api.sandbox.midtrans.com/v1/payment-links"

export default function PesananBatal() {
    const SECRET = import.meta.env.VITE_SECRET_PAYMENT
    const encodeSecret = btoa(SECRET)
    const { idPesanan } = useParams()
    const [dataPesanan, setDataPesanan] = useState({})
    const [settlements, setSettlements] = useState([{}])
    const [packageData, setPackageData] = useState({})
    const [menuData, setMenuData] = useState({})
    const [isiMenu, setIsiMenu] = useState([])
    const [userData, setUserData] = useState({})
    const [sellerData, setSellerData] = useState({})
    const [statusCode, setStatusCode] = useState({ code: 0, statusText: "" })

    const [isLoading, setIsLoading] = useState(true)
    const [isHowPayment, setIsHowPayment] = useState(false)
    const [isPopUpQuestion, setPopUpQuestion] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchDataPesanan()
        function fetchDataPesanan() {
            axios.get(`${urlPesanan}/?id=${idPesanan}&statusCode=${-1}`)
                .then((res) => {
                    setStatusCode({ code: res.status, statusText: res.statusText })
                    if (res.data.length != 0) {
                        setDataPesanan(res.data[0])
                        fetchData(res.data[0].idPaket, res.data[0].idMenu, res.data[0].idUser)
                        setIsLoading(false)
                    } else {
                        setStatusCode({ code: 404, statusText: "Tidak Ditemukan" })
                        setIsLoading(false)
                    }
                })
                .catch((err) => {
                    setStatusCode({ code: err.response.status, statusText: err.response.statusText })
                    console.log(err);
                    setIsLoading(false)
                    // console.log(err);
                })
        }

        function fetchData(idPaket, idMenu, idUser) {
            axios.get(`${urlPackages}/${idPaket}`)
                .then((resPaket) => {
                    setPackageData(resPaket.data)
                    axios.get(`${urlSeller}/${resPaket.data.idPenjual}`)
                        .then((resSeller) => {
                            setSellerData(resSeller.data)
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                })
            axios.get(`${urlMenus}/${idMenu}`)
                .then((res) => {
                    setMenuData(res.data)
                    setIsiMenu(res.data.isiMenu)
                })
                .catch((err) => {
                    console.log(err);
                })
            axios.get(`${urlUser}/${idUser}`)
                .then((res) => {
                    setUserData(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    const handleCopyClick = () => {
        copy(dataPesanan.linkPembayaran);
    };
    function formatDate(inputDate) {
        // Buat objek Date dari string input
        const dateObj = new Date(inputDate);

        const options = {
            timeZone: "Asia/Jakarta",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };

        // Mendapatkan string dengan format yang diinginkan
        const formattedDate = dateObj.toLocaleString("id-ID", options);
        return formattedDate + " WIB"
    }

    function batalkanPesanan() {
        setIsLoading(true)
        const dataUpdate = {
            linkPembayaran: null,
            statusCode: -1,
            status: "Dibatalkan"
        }
        axios.patch(`${urlPesanan}/${idPesanan}`, dataUpdate)
            .then((res) => {
                console.log(res);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
        setPopUpQuestion(false)
        console.log("Pesanan Dibatalkan");
        navigate(-1)
    }

    if (statusCode.code !== 200) {
        return (
            <SearchProvider>
                <NavbarUser />
                <main className='py-16 w-[360px] mx-auto'>
                    <img src={mascotError} alt="" width={200} className='mx-auto mt-10' />
                    <h1 className='text-primary-100 font-bold text-3xl text-center'>{statusCode.code}</h1>
                    <h3 className='text-accent-200 font-bold text-center'>{statusCode.statusText}</h3>
                </main>
                <Loader show={isLoading} />
            </SearchProvider>
        )
    }
    return (
        <SearchProvider>
            <NavbarUser />
            <main className='pt-16 pb-5 w-[360px] mx-auto'>
                <section className="flex items-center mt-5 relative">
                    <button onClick={() => navigate(-1)} className="text-primary-100 absolute left-0">
                        <Icon icon="material-symbols:arrow-back" width={27} />
                    </button>
                    <h1 className="mx-auto text-primary-100 font-bold">Pesanan Dibatalkan</h1>
                </section>
                <hr className='my-4 border-gray-300' />
                <div>
                    <Icon icon="mdi:archive-cancel-outline" className='text-primary-100 mx-auto' width={90} />
                </div>
                <hr className='my-4 border-gray-300' />
                <section>
                    <h1 className='mx-auto mb-2 text-lg text-accent-200 font-bold text-center'>Informasi Pesanan</h1>
                    <div className='grid grid-cols-2 gap-2 w-full p-4 border-2 rounded border-primary-100'>
                        <div>
                            <h1 className='font-bold text-primary-100'>Tanggal Pesan</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.tanggalPesan}</p>
                        </div>
                        <div>
                            <h1 className='font-bold text-primary-100'>Nomor Pesanan</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.id}</p>
                        </div>
                    </div>
                    <div className='mt-4 flex flex-col gap-2 w-full p-4 border-2 rounded border-primary-100'>
                        <div className='flex gap-2'>
                            <div className='relative w-28 h-28 aspect-square rounded bg-gray-300 bg-cover bg-center border border-gray-200 shadow' style={{ backgroundImage: `url(${menuData.gambarMenu})` }}>
                                <p className='bg-white shadow w-fit max-w-[100px] px-2 py-1 rounded text-[8px] select-none absolute right-1 top-1 overflow-hidden text-ellipsis whitespace-nowrap'>{menuData.namaMenu}</p>
                            </div>
                            <div>
                                <h1 className='max-h-10 text-primary-100 leading-5 font-medium overflow-hidden text-ellipsis whitespace-pre-wrap line-clamp-2 cursor-default'>{packageData.namaPaket}</h1>
                                <div className='flex items-center gap-1 text-sm font-medium text-accent-200 mt-1'>
                                    <Icon icon="entypo:shop" width={14} />
                                    <h4 id='seller' >{sellerData.nama}</h4>
                                </div>
                                <h3 className='text-accent-200 text-sm'>{menuData.namaMenu}</h3>
                                <h1 className='text-accent-200 font-semibold'>{Rp(menuData.hargaMenu)}</h1>

                            </div>
                        </div>
                        <div>
                            <h1 className='font-bold text-primary-100'>Isi Menunya :</h1>
                            <ul className='grid grid-cols-2 ml-4 list-disc text-accent-200'>
                                {isiMenu.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-y-2 mt-4 w-full p-4 border-2 rounded border-primary-100'>
                        <div className='col-span-2'>
                            <h1 className='font-bold text-primary-100'>Pemesan</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.namaPemesan}</p>
                        </div>
                        <div>
                            <h1 className='font-bold text-primary-100'>Nomor HP</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.hp}</p>
                        </div>
                        <div>
                            <h1 className='font-bold text-primary-100'>Email</h1>
                            <p className='text-accent-200 font-semibold'>{userData.email}</p>
                        </div>
                        <div>
                            <h1 className='font-bold text-primary-100'>Waktu Acara</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.waktuAcara}</p>
                        </div>
                        <div>
                            <h1 className='font-bold text-primary-100'>Jumlah Pesanan Porsi</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.porsi}</p>
                        </div>
                        <div className="col-span-2">
                            <h1 className='font-bold text-primary-100 '>Catatan</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.catatan ? dataPesanan.catatan : "-"}</p>
                        </div>
                        <div className="col-span-2">
                            <h1 className='font-bold text-primary-100 '>Alamat Pengiriman</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.alamat}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-4 w-full p-4 border-2 rounded border-primary-100'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-primary-100'>Total Pembayaran</h1>
                            <p className='text-accent-200 font-bold text-lg'>{Rp(dataPesanan.totalHarga)}</p>
                        </div>
                    </div>
                </section>
            </main>
            <Loader show={isLoading} />
        </SearchProvider>
    )
}