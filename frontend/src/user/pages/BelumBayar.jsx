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

export default function BelumBayar() {
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
        const getPaymentStatus = {
            method: 'GET',
            url: `${urlPaymentStatus}/${idPesanan}`,
            headers: {
                accept: 'application/json',
                authorization: `Basic ${encodeSecret}`
            }
        };
        axios.request(getPaymentStatus)
            .then((res) => {
                const data = res.data
                const dataSettlements = data.purchases.filter((purchase) => purchase.payment_status === "SETTLEMENT");
                if (dataSettlements.length != 0) {
                    setSettlements(dataSettlements)
                    setPesananDiproses(dataSettlements[0].createdAt)
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

    function setPesananDiproses(date) {
        const dataUpdate = {
            statusBayar: "Dibayar",
            tanggalBayar: formatDate(date),
            statusCode: 1,
            status: "Diproses"
        }
        axios.patch(`${urlPesanan}/${idPesanan}`, dataUpdate)
            .then((res) => {
                console.log(res.status);
            })
            .catch((err) => {
                console.log(err);
            })
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
                navigate(-1)
                setIsLoading(false)
                setPopUpQuestion(false)
            })
            .catch((err) => {
                console.log(err);
                setPopUpQuestion(false)
                setIsLoading(false)
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
                <section className={settlements[0].payment_status ? "flex flex-col mt-7" : "hidden"}>
                    <Icon icon="icon-park-outline:success" className='text-green-500 mx-auto' width={100} />
                    <h1 className='font-bold text-accent-200 text-lg text-center'>Pembayaran Berhasil</h1>
                    <h3 className='text-accent-200 mt-4'>Detail :</h3>
                    <div className='grid grid-cols-2 mt-1 gap-1'>
                        <div>
                            <h3 className='text-accent-200 font-medium'>Metode Pembayaran</h3>
                            <h3 className='text-accent-200 font-bold'>{settlements[0].payment_method}</h3>
                        </div>
                        <div>
                            <h3 className='text-accent-200 font-medium'>ID Pembayaran</h3>
                            <h3 className='text-accent-200 font-bold text-sm'>{settlements[0].order_id}</h3>
                        </div>

                        <div>
                            <h3 className='text-accent-200 font-medium'>Waktu Bayar</h3>
                            <h3 className='text-accent-200 font-bold'>{formatDate(settlements[0].createdAt)}</h3>
                        </div>

                    </div>
                </section>
                <section className={settlements[0].payment_status ? "hidden" : "mt-4 text-center w-full"}>
                    <h1 className='font-bold text-accent-200'>Menunggu Pembayaran</h1>
                    <h3 className='text-accent-200'>Selesaikan pembayaran sebelum :</h3>
                    <h1 className='font-extrabold text-primary-100 text-xl'>{dataPesanan.batasBayar}</h1>
                    <h3 className='text-accent-200'>Untuk menghindari pembatalan otomatis.</h3>
                    <div className='flex justify-center py-4'>
                        <QRCodeSVG
                            value={dataPesanan.linkPembayaran}
                            size={180}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                            imageSettings={{
                                src: 'https://i.imgur.com/o361WeZ.png',
                                x: undefined,
                                y: undefined,
                                height: 24,
                                width: 24,
                                excavate: true,
                            }}
                        />
                    </div>
                    <div className='text-start w-full flex flex-col'>
                        <h4 className='text-accent-200 mt-2'>Link Pembayaran :</h4>
                        <a href={dataPesanan.linkPembayaran} target='_blank'
                            className="underline italic text-primary-100 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{dataPesanan.linkPembayaran}</a>
                        <div className='flex items-center mt-2 gap-2'>
                            <div className='w-full group relative'>
                                <button onClick={(e) => handleCopyClick()} className='text-primary-100 text-sm w-full bg-white border border-primary-100 p-1 rounded mt-2 transition-all hover:bg-gray-200 active:bg-white'>Copy Link</button>
                                <div className='hidden bg-gray-100 right-0 select-none shadow border border-gray-200 mt-1 p-1 rounded absolute group-focus-within:flex'>
                                    <p className='text-primary-100'>Link dicopy</p>
                                </div>
                            </div>
                            <a className='w-full' href={dataPesanan.linkPembayaran} target='_blank'>
                                <button className='text-white text-sm w-full bg-primary-100 p-1 rounded mt-2 hover:bg-opacity-75 active:bg-opacity-100'>Bayar</button>
                            </a>
                        </div>
                    </div>
                    <h1 onClick={() => setIsHowPayment(!isHowPayment)} className='flex items-center w-fit text-start mt-4 underline text-accent-200 cursor-pointer'><Icon icon="ic:round-play-arrow" /> Cara Bayar</h1>
                    <ul className={isHowPayment ? 'flex flex-col gap-1 mt-2 text-start list-disc ml-5 text-accent-200' : "hidden"}>
                        <li className='leading-5'>Scan QR Code diatas atau Klik Link pembayaran diatas atau klik tombol bayar diatas. Maka akan diarahkan ke halaman penyedia pembayaran.</li>
                        <li className='leading-5'>Kemudian ikuti intruksi yang ada pada halaman penyedia pembayaran.</li>
                        <li className='leading-5'>Jika sudah melakukan pembayaran, kembali ke halaman ini maka akan ada pemberitahuan pembayaran berhasil. Jika belum ada coba refresh halaman ini.</li>
                    </ul>
                </section>
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
                <section className='flex items-center gap-2 mt-4'>
                    <button onClick={() => setPopUpQuestion(true)} className={settlements[0].payment_status ? 'hidden' : 'w-1/2 ml-auto bg-gray-200 rounded border border-primary-200 py-2 font-semibold text-primary-100 hover:bg-white transition-all active:bg-gray-200'}>Batalkan Pesanan</button>
                    <button onClick={() => navigate("/pesanan/diproses")} className={settlements[0].payment_status ? 'w-1/2 ml-auto bg-gray-200 rounded border border-primary-200 py-2 font-semibold text-primary-100 hover:bg-white transition-all active:bg-gray-200' : 'hidden'}>Halaman Pesanan</button>
                </section>
                <hr className='my-4 border-gray-300' />
                <section className='flex flex-col gap-2 mt-4 w-full p-4 border-2 rounded border-primary-100'>
                    <h1 className='text-primary-100 font-semibold'>Mengalami kendala saat pembayaran?</h1>
                    <p className='leading-5 text-accent-200'>Hubungi kami untuk mendapatkan bantuan terkait permasalahan anda.</p>
                    <button onClick={() => navigate("/contact-us")} className='w-full py-2 bg-primary-100 text-white rounded hover:bg-opacity-75 active:bg-opacity-100'>Hubungi Kami</button>
                </section>
            </main>
            <Loader show={isLoading} />
            <PopUpQuestion isOpen={isPopUpQuestion} message={"Apakah anda yakin akan membatalkan pesanan ini?"} onProcess={() => batalkanPesanan()} onClose={() => setPopUpQuestion(false)} onCancel={() => setPopUpQuestion(false)} />
        </SearchProvider>
    )
}