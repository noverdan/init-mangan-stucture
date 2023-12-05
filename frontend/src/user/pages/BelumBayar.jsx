import React, { useEffect, useState } from 'react';
import { SearchProvider } from '../context/SearchProvider';
import NavbarUser from '../components/NavbarUser';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import mascotError from "../../assets/mascot-murka.png";
import copy from 'clipboard-copy'
import Rp from '../../utils/Rupiah';
import { QRCodeSVG } from 'qrcode.react';

const urlBelumBayar = "http://localhost:3000/belum-bayar"
const urlPackages = "http://localhost:3000/packages"
const urlMenus = "http://localhost:3000/menus"
const urlUser = "http://localhost:3000/user"
const urlSeller = "http://localhost:3000/sellers"

export default function BelumBayar() {
    const { idPesanan } = useParams()
    const [dataPesanan, setDataPesanan] = useState({})
    const [packageData, setPackageData] = useState({})
    const [menuData, setMenuData] = useState({})
    const [isiMenu, setIsiMenu] = useState([])
    const [userData, setUserData] = useState({})
    const [sellerData, setSellerData] = useState({})
    const [statusCode, setStatusCode] = useState({ code: 0, statusText: "" })
    console.log(dataPesanan);
    console.log(packageData);
    console.log(sellerData);
    console.log(menuData);
    console.log(isiMenu);
    console.log(userData);

    const [isLoading, setIsLoading] = useState(true)
    const [isHowPayment, setIsHowPayment] = useState(false)

    useEffect(() => {

        axios.get(`${urlBelumBayar}/${idPesanan}`)
            .then((res) => {
                setStatusCode({ code: res.status, statusText: res.statusText })
                setDataPesanan(res.data)
                fetchData(res.data.idPaket, res.data.idMenu, res.data.idUser)
                setIsLoading(false)
                // console.log(res);
            })
            .catch((err) => {
                setStatusCode({ code: err.response.status, statusText: err.response.statusText })
                setIsLoading(false)
                // console.log(err);
            })
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
                <section className='mt-4 text-center w-full'>
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
                    <ul className={isHowPayment ? 'mt-2 text-start list-disc ml-5 text-accent-200' : "hidden"}>
                        <li>Scan QR Code diatas atau Klik Link pembayaran diatas atau klik tombol bayar diatas. Maka akan diarahkan ke halaman penyedia pembayaran.</li>
                        <li>Kemudian ikuti intruksi yang ada pada halaman penyedia pembayaran.</li>
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
                        <div>
                            <h1 className='font-bold text-primary-100'>Pembayaran</h1>
                            <p className='text-accent-200 font-semibold'>{dataPesanan.statusBayar}</p>
                        </div>
                    </div>
                    <div className='mt-4 flex flex-col gap-2 w-full p-4 border-2 rounded border-primary-100'>
                        <div className='flex gap-2'>
                            <div className='relative w-28 h-28 aspect-square rounded bg-gray-300 bg-cover bg-center border border-gray-200 shadow' style={{ backgroundImage: `url(${menuData.gambarMenu})` }}>
                                <p className='bg-white shadow w-fit max-w-[100px] px-2 py-1 rounded text-[8px] select-none absolute right-1 top-1 overflow-hidden text-ellipsis whitespace-nowrap'>Menu A</p>
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
                            <p className='text-accent-200 font-semibold'>{userData.nama}</p>
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
                    <button className='w-1/2 ml-auto bg-gray-200 rounded border border-primary-200 py-2 font-semibold text-primary-100 hover:bg-white transition-all active:bg-gray-200'>Batalkan Pesanan</button>
                </section>
                <hr className='my-4 border-gray-300' />
                <section className='flex flex-col gap-2 mt-4 w-full p-4 border-2 rounded border-primary-100'>
                    <h1 className='text-primary-100 font-semibold'>Mengalami kendala saat pembayaran?</h1>
                    <p className='leading-5 text-accent-200'>Hubungi kami untuk mendapatkan bantuan terkait permasalahan anda.</p>
                    <button className='w-full py-2 bg-primary-100 text-white rounded hover:bg-opacity-75 active:bg-opacity-100'>Hubungi Kami</button>
                </section>
            </main>
            <Loader show={isLoading} />
        </SearchProvider>
    )
}