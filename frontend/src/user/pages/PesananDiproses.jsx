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
import { QRCodeSVG } from 'qrcode.react';
import { PopUpQuestion } from '../components/PopUp';

const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenus = import.meta.env.VITE_URL_MENUS
const urlUser = import.meta.env.VITE_URL_USER
const urlSeller = import.meta.env.VITE_URL_SELLERS
const urlPesanan = import.meta.env.VITE_URL_ORDERS
const urlPaymentStatus = import.meta.env.VITE_PAYMENT_API

export default function PesananDiproses() {
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

    const [popUpQuestion, setPopUpQuestion] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    console.log("terjual:" + packageData.paketTerjual);

    console.log(settlements[0]);

    useEffect(() => {
        const getPaymentStatus = {
            method: 'GET',
            url: `${urlPaymentStatus}/${idPesanan}`,
            headers: {
                accept: 'application/json',
                authorization: `Basic ${encodeSecret}`
            }
        }
        axios.request(getPaymentStatus)
            .then((res) => {
                const data = res.data
                const dataSettlements = data.purchases.filter((purchase) => purchase.payment_status === "SETTLEMENT");
                if (dataSettlements.length != 0) {
                    setSettlements(dataSettlements)
                    fetchDataPesanan(1)
                    console.log("sudah bayar");
                } else {
                    console.log("Belum Bayar");
                    fetchDataPesanan(0)
                }
            }).catch((err) => {
                console.log(err);
                setStatusCode({ code: err.response.status, statusText: err.response.statusText })
                setIsLoading(false)
            })
        function fetchDataPesanan(code) {
            axios.get(`${urlPesanan}/?id=${idPesanan}&statusCode=${code}`)
                .then((res) => {
                    setStatusCode({ code: res.status, statusText: res.statusText })
                    if (res.data.length != 0) {
                        setDataPesanan(res.data[0])
                        fetchData(res.data[0].idPaket, res.data[0].idMenu, res.data[0].idUser)
                        setIsLoading(false)
                    } else {
                        fetchDataPesanan(1)
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
        return formattedDate
    }
    function setSelesai() {
        const dataUpdate = {
            statusCode: 2,
            status: "Selesai"
        }
        axios.patch(`${urlPesanan}/${idPesanan}`, dataUpdate)
            .then((res) => {
                console.log(res.status);
                setIsLoading(false)
                setPopUpQuestion(false)
                axios.patch(`${urlPackages}/${packageData.id}`, { paketTerjual: packageData.paketTerjual + 1 })
                navigate("/pesanan/selesai")
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
                setPopUpQuestion(false)
            })
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
                    <h1 className="mx-auto text-primary-100 font-bold">Pesanan Diproses</h1>
                </section>
                <hr className='my-4 border-gray-300' />
                <div>
                    <Icon icon="gg:sand-clock" className='text-yellow-300 mx-auto' width={90} />
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
                        <div className='flex flex-col justify-between'>
                            <h1 className='font-bold text-primary-100'>Rincian Pembayaran</h1>
                            <div className='grid grid-cols-2 gap-2 mt-1'>
                                <div className='col-span-2'>
                                    <p className='text-accent-200 h-4 text-sm'>Id Pembayaran</p>
                                    <p className='text-accent-200 font-bold mt-1'>{settlements[0].order_id}</p>
                                </div>
                                <div className=''>
                                    <p className='text-accent-200 h-4 text-sm'>Metode</p>
                                    <p className='text-accent-200 font-bold text-lg'>{settlements[0].payment_method}</p>
                                </div>
                                <div className=''>
                                    <p className='text-accent-200 h-4 text-sm'>Waktu</p>
                                    <p className='text-accent-200 font-bold '>{formatDate(settlements[0].createdAt)}</p>
                                </div>
                            </div>
                        </div>
                        <hr className='my-2 border-gray-300' />
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-primary-100'>Total Pembayaran</h1>
                            <p className='text-accent-200 font-bold text-lg'>{Rp(settlements[0].amount_value)}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-4 w-full p-4 border-2 rounded border-primary-100'>
                        <div className='flex flex-col justify-center gap-2'>
                            <div className='flex items-center gap-2'>
                                <h1 className='font-bold text-primary-100'>Status Pesanan</h1>
                                <Icon icon="akar-icons:info-fill" className='text-primary-100' />
                            </div>
                            <div>
                                <h1 className='font-bold text-accent-200'>{dataPesanan.status}</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='flex items-center gap-2 mt-4'>
                    <button className={'w-1/2 ml-auto bg-white rounded border border-primary-200 py-2 font-semibold text-primary-100 hover:bg-gray-200 transition-all active:bg-primary-100'}>Hubungi Penjual</button>
                    <button onClick={() => setPopUpQuestion(true)} className={'w-1/2 ml-auto bg-primary-100 rounded border border-primary-200 py-2 font-semibold text-white hover:bg-gray-200 transition-all hover:text-primary-100 active:bg-white'}>Pesanan Diterima</button>
                </section>
                <hr className='my-4 border-gray-300' />
                <section className='flex flex-col gap-2 mt-4 w-full p-4 border-2 rounded border-primary-100'>
                    <h1 className='text-primary-100 font-semibold'>Ada masalah terkait pesanan anda?</h1>
                    <p className='leading-5 font-medium text-accent-200'>Hubungi kami untuk mendapatkan bantuan terkait permasalahan anda.</p>
                    <button onClick={() => navigate("/contact-us")} className='w-full py-2 bg-primary-100 text-white rounded hover:bg-opacity-75 active:bg-opacity-100'>Hubungi Kami</button>
                </section>
            </main>
            <PopUpQuestion
                isOpen={popUpQuestion}
                message={
                    <>
                        <h1 className='text-primary-100 font-bold leading-5'>Apakah anda yakin menerima pesanan ini?</h1>
                        <p className='leading-5 text-sm mt-2 '>Dengan menerima pesanan ini anda mengkofirmasi bahwa pesanan telah diterima. Pesanan akan ditandai telah selesai, selanjutnya anda bisa untuk mengulas pesanan ini.</p>
                    </>
                }
                onProcess={() => setSelesai()}
                onCancel={() => setPopUpQuestion(false)}
                onClose={() => setPopUpQuestion(false)}
            />
            <Loader show={isLoading} />
        </SearchProvider>
    )
}