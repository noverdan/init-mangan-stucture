import React, { useContext, useEffect, useState } from 'react';
import NavbarUser from '../components/NavbarUser';
import { SearchProvider } from '../context/SearchProvider';
import { Icon } from '@iconify/react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/inputnumber.css"
import id from 'date-fns/locale/id';
import { subDays, addDays } from 'date-fns';
import axios from 'axios';
import Rp from '../../utils/Rupiah';
import { PopUpAlert, PopUpQuestion } from '../components/PopUp';
import getPaymentLink from '../../utils/getPaymentLink';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenus = import.meta.env.VITE_URL_MENUS
const urlUser = import.meta.env.VITE_URL_USER
const urlSellers = import.meta.env.VITE_URL_SELLERS
const urlPesanan = import.meta.env.VITE_URL_ORDERS

export default function Checkout() {
    const stateCheckout = JSON.parse(sessionStorage.getItem("stateCheckout"))
    if (!stateCheckout) {
        return (
            <>
                <h1>NOT Found</h1>
            </>
        )
    }
    const [porsi, setPorsi] = useState(1)
    registerLocale('id', id)
    const navigate = useNavigate()

    const [openAlert, setOpenAlert] = useState(false)
    const [openQuestion, setOpenQuestion] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [userData, setUserData] = useState()
    const [packageData, setPackageData] = useState({})
    const [menuData, setMenuData] = useState({})
    const [sellerData, setSellerData] = useState({})

    const [inputWaktu, setInputWaktu] = useState({ tanggal: undefined, jam: undefined })
    const [inputUser, setInputUser] = useState({
        nama: "",
        hp: "",
        tanggal: "",
        jam: "",
        alamat: "",
        catatan: ""
    })

    useEffect(() => {
        getUser(stateCheckout.idUser)
        getPackage(stateCheckout.idPackage)
        getMenu(stateCheckout.idMenu)
    }, [])
    async function getPackage(id) {
        await axios.get(`${urlPackages}/${id}`)
            .then(function (res) {
                setPackageData(res.data)
                getSeller(res.data.idPenjual)
            })
            .catch(function (err) {
                const errMessage = err.message
                console.log(errMessage);
            });
    }
    async function getMenu(id) {
        await axios.get(`${urlMenus}/${id}`)
            .then(function (res) {
                setMenuData(res.data)
            })
            .catch(function (err) {
                const errMessage = err.message
                console.log(errMessage);
            });
    }
    async function getSeller(idSeller) {
        await axios.get(`${urlSellers}/${idSeller}`)
            .then(function (res) {
                setSellerData(res.data)
            })
            .catch(function (err) {
                const errMessage = err.message
                console.log(errMessage);
            });
    }
    async function getUser(id) {
        await axios.get(`${urlUser}/${id}`)
            .then(function (res) {
                const data = res.data
                setUserData(data)
                setInputUser({ ...inputUser, nama: data.nama, hp: data.hp, alamat: data.alamat })
            })
            .catch(function (err) {
                const errMessage = err.message
                console.log(errMessage);
            });
    }

    function validateInput() {
        if (inputUser.nama && inputUser.hp && inputUser.tanggal && inputUser.jam && inputUser.alamat) {
            setOpenQuestion(true)
        }
        else {
            setOpenAlert(true)
        }
    }

    function setUpData() {
        const data = {
            transaction_details: {
                order_id: generateRandomId(),
                gross_amount: menuData.hargaMenu * porsi
            },
            customer_required: true,
            customer_details: {
                first_name: inputUser.nama,
                email: userData.email,
                phone: inputUser.hp,
                shipping_address: {
                    address: inputUser.alamat
                }
            },
            item_details: [{
                id: packageData.id,
                price: menuData.hargaMenu,
                quantity: porsi,
                name: packageData.namaPaket
            }],
            expiry: {
                start_time: getDateNow(),
                duration: 1,
                unit: "days"
            }
        }
        // const dataString = JSON.stringify(data)
        return data
    }

    async function processPayment() {
        setOpenQuestion(false)
        setIsLoading(true)
        const paymentData = setUpData()
        const paymentLink = await getPaymentLink(paymentData)
        uploadOrderData(paymentLink.order_id, paymentLink.payment_url, paymentData.expiry.start_time)
    }

    function uploadOrderData(orderId, paymentLink, orderDate) {
        const date = orderDate.substring(0, 16)
        const dateObject = new Date(date)
        dateObject.setDate(dateObject.getDate() + 1)
        const batasBayar = dateObject.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
        const batasBayarFormated = batasBayar.replace(/(\d{2}\.\d{2})\.\d{2}$/, '$1');
        const post = {
            method: 'POST',
            url: urlPesanan,
            data: {
                id: orderId,
                namaPemesan: inputUser.nama,
                hp: inputUser.hp,
                alamat: inputUser.alamat,
                tanggalPesan: date,
                waktuAcara: `${inputUser.tanggal}, ${inputUser.jam}`,
                porsi: porsi,
                totalHarga: menuData.hargaMenu * porsi,
                catatan: inputUser.catatan,
                linkPembayaran: paymentLink,
                statusBayar: null,
                batasBayar: batasBayarFormated,
                tanggalBayar: null,
                idUser: userData.id,
                idPaket: packageData.id,
                idMenu: menuData.id,
                statusCode: 0,
                status: "Belum Bayar",
            }
        }
        axios.request(post)
            .then((res) => {
                const idPesanan = res.data.id
                sessionStorage.removeItem("stateCheckout")
                navigate(`/pesanan/belumbayar/${idPesanan}`, { replace: true })
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function getDateNow() {
        const sekarang = new Date();
        const tanggal = sekarang.getDate();
        const bulan = sekarang.getMonth() + 1;
        const tahun = sekarang.getFullYear();
        const jam = sekarang.getHours();
        const menit = sekarang.getMinutes();
        const tanggalJamString = tahun + "-" + padZero(bulan) + "-" + padZero(tanggal) + " " + padZero(jam) + ":" + padZero(menit) + " +0700";
        function padZero(n) {
            return (n < 10) ? "0" + n : n;
        }
        return tanggalJamString
    }

    function getTanggal(date) {
        const hari = date.getDate()
        const bulan = (date.getMonth() + 1)
        const tahun = date.getFullYear()
        const tanggal = `${hari}/${bulan}/${tahun}`
        return tanggal
    }
    function getJam(date) {
        const jam = date.getHours();
        const menit = date.getMinutes();
        const jamString = padZero(jam) + ":" + padZero(menit);
        function padZero(n) {
            return (n < 10) ? "0" + n : n;
        }
        return jamString
    }
    function handleCounter(value) {
        if (isNaN(value)) {
            return
        } else {
            if (value > 0) {
                setPorsi(value)
            } else {
                return
            }
        }
    }
    function handleInput(prop, value) {
        if (prop === "tanggal") {
            setInputWaktu((prev) => ({ ...prev, [prop]: value }))
            setInputUser((prev) => ({ ...prev, [prop]: getTanggal(value) }))
        } else if (prop === "jam") {
            setInputWaktu((prev) => ({ ...prev, [prop]: value }))
            setInputUser((prev) => ({ ...prev, [prop]: getJam(value) }))
        }
        else {
            setInputUser((prev) => ({ ...prev, [prop]: value }))
        }
    }



    return (
        <>
            <SearchProvider>
                <NavbarUser />
            </SearchProvider>
            <main className='pt-16 pb-20 w-[360px]  mx-auto'>
                <header className='flex items-center my-4'>
                    <button onClick={() => navigate(-1)} >
                        <Icon className='text-primary-100' icon="ic:baseline-arrow-back" width={25} />
                    </button>
                    <h1 className='mx-auto text-primary-100 font-bold'>Checkout</h1>
                </header>
                <section className='flex gap-4 px-2 py-2 rounded shadow-md border border-primary-300 mt-5'>
                    <div className='relative w-32 h-32 aspect-square rounded bg-gray-300 bg-cover bg-center border border-gray-200 shadow' style={{ backgroundImage: `url(${menuData.gambarMenu})` }}>
                        <p className='bg-white shadow w-fit max-w-[100px] px-2 py-1 rounded text-[8px] select-none absolute right-1 top-1 overflow-hidden text-ellipsis whitespace-nowrap'>{menuData.namaMenu}</p>
                    </div>
                    <div className=''>
                        <h1 className='max-h-10 text-primary-100 leading-5 font-medium overflow-hidden text-ellipsis whitespace-pre-wrap line-clamp-2 cursor-default'>{packageData.namaPaket}</h1>
                        <div className='flex items-center gap-1 text-sm font-medium text-accent-200 mt-1'>
                            <Icon icon="entypo:shop" width={14} />
                            <h4 id='seller' >{sellerData.nama}</h4>
                        </div>
                        <h3 className='text-accent-200 text-sm'>{menuData.namaMenu}</h3>
                        <h1 className='text-accent-200 font-semibold'>{Rp(menuData.hargaMenu)}</h1>
                        <div className='mt-2 flex items-center gap-2'>
                            <div className='flex justify-between rounded w-fit border border-gray-300 text-accent-200 text-sm font-medium'>
                                <button onClick={() => porsi == 1 ? setPorsi(1) : setPorsi(porsi - 1)} className='px-2 border-r hover:bg-gray-200'>-</button>
                                <input className='w-11 border-none p-0 focus:ring-0 text-center' type="number" value={porsi} onChange={(e) => handleCounter(parseInt(e.target.value))} />
                                <button onClick={() => setPorsi(porsi + 1)} className='px-2 border-l hover:bg-gray-200'>+</button>
                            </div>
                            <h3 className='text-accent-200 text-sm font-medium'>Jumlah Porsi</h3>
                        </div>
                    </div>
                </section>
                <section className='p-4 rounded shadow-md border border-primary-300 mt-5'>
                    <h1 className='text-primary-100 font-medium text-center mb-2'>Data Pemesan</h1>
                    <label className='text-primary-100 py-0' htmlFor="nama">Nama</label>
                    <div className='mb-2 mt-1 rounded border flex items-center border-primary-100 px-2'>
                        <label htmlFor="nama"><Icon icon="bi:person-fill" className='text-primary-100' /></label>
                        <input id='nama'
                            type="text"
                            placeholder='Nama'
                            value={inputUser.nama}
                            onChange={(e) => handleInput("nama", e.target.value)}
                            className='focus:ring-0 border-none pl-2 px-0 w-full h-8 placeholder:text-gray-400 ' />
                    </div>
                    <label className='text-primary-100 py-0' htmlFor="nama">HP</label>
                    <div className='mb-2 mt-1 rounded border flex items-center border-primary-100 px-2'>
                        <label htmlFor="nama"><Icon icon="mdi:telephone" className='text-primary-100' /></label>
                        <input id='nama'
                            type="tel"
                            placeholder='Nomor HP'
                            value={inputUser.hp}
                            onChange={(e) => handleInput("hp", e.target.value)}
                            className='focus:ring-0 border-none pl-2 px-0 w-full h-8 placeholder:text-gray-400 ' />
                    </div>
                    <p className='text-primary-100'>Waktu</p>
                    <div className='flex items-center gap-2 mt-1 mb-2'>
                        <div className='flex items-center px-2 rounded border border-primary-100'>
                            <Icon icon="ic:round-date-range" className='text-primary-100' width={26} />
                            <DatePicker
                                className='w-full border-none h-8 bg-transparent px-0 pl-2 placeholder:text-gray-400 focus:ring-0'
                                selected={inputWaktu.tanggal}
                                onChange={(date) => handleInput("tanggal", date)}
                                locale="id"
                                dateFormat="dd/MM/yyyy"
                                minDate={subDays(new Date(), -1)}
                                maxDate={addDays(new Date(), 31)}
                                placeholderText='Tanggal Acara'
                            />
                        </div>
                        <div className='flex items-center px-2 rounded border border-primary-100'>
                            <Icon icon="ri:time-fill" className='text-primary-100' width={26} />
                            <DatePicker
                                className='w-full border-none h-8 bg-transparent px-0 pl-2 placeholder:text-gray-400 focus:ring-0'
                                selected={inputWaktu.jam}
                                onChange={(date) => handleInput("jam", date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Jam"
                                dateFormat="p"
                                locale="id"
                                placeholderText='Jam Acara'
                            />
                        </div>
                    </div>
                    <label className='text-primary-100 py-0' htmlFor="alamat">Alamat Pengiriman</label>
                    <div className='mb-2 mt-1 rounded border flex items-start border-primary-100'>
                        <textarea id='alamat'
                            type="address"
                            placeholder='Alamat lengkap'
                            value={inputUser.alamat}
                            onChange={(e) => handleInput("alamat", e.target.value)}
                            className='focus:ring-0 border-none my-1 w-full h-10 min-h-[117px] placeholder:text-gray-400 ' />
                    </div>
                    <label className='text-primary-100 py-0' htmlFor="nama">Catatan</label>
                    <div className='mb-2 mt-1 rounded border flex items-center border-primary-100 px-2'>
                        <label htmlFor="catatan"><Icon icon="material-symbols:stylus-note-sharp" className='text-primary-100' /></label>
                        <input id='catatan'
                            type="text"
                            placeholder='Catatan untuk penjual'
                            value={inputUser.catatan}
                            onChange={(e) => handleInput("catatan", e.target.value)}
                            className='focus:ring-0 border-none pl-2 px-0 w-full h-8 placeholder:text-gray-400 ' />
                    </div>
                </section>
            </main>
            <footer>
                <div className='w-full h-16 bg-white shadow-[0px_0px_10px_-5px_#000000] fixed bottom-0 z-[20]'>
                    <div className='w-[360px] h-full justify-between mx-auto flex gap-4 items-center'>
                        <div>
                            <h4 className='text-sm text-accent-200 font-medium h-4'>Total Harga</h4>
                            <h1 className='font-bold text-accent-200 text-lg'>{Rp(menuData.hargaMenu * porsi)}</h1>
                        </div>
                        <button onClick={() => validateInput()}
                            className='px-10 py-1 bg-primary-100 border-primary-100 border text-white font-medium rounded hover:bg-opacity-70 active:bg-opacity-100 '>Checkout</button>
                    </div>
                </div>
            </footer>
            <PopUpAlert isOpen={openAlert} message={"Lengkapi data terlebih dahulu."} onProcess={() => setOpenAlert(false)} onClose={() => setOpenAlert(false)} />
            <PopUpQuestion isOpen={openQuestion} message={<Question />} onProcess={() => processPayment()} onCancel={() => setOpenQuestion(false)} onClose={() => setOpenQuestion(false)} />
            <Loader show={isLoading} />
        </>
    )
}

function Question() {
    return (
        <>
            <h1 className='text-primary-100 font-bold text-lg'>Lanjutkan Pembayaran?</h1>
            <p>Pastikan data pesanan sudah sesuai.</p>
        </>
    )
}

function generateRandomId() {
    // Mendapatkan timestamp (waktu saat ini dalam milidetik)
    const timestamp = new Date().getTime();

    // Mendapatkan angka acak antara 1000 dan 9999
    const randomNum = Math.floor(Math.random() * 9000) + 1000;

    // Menggabungkan timestamp dan angka acak
    const randomId = timestamp.toString() + randomNum.toString();

    return randomId; // Mengonversi ke dalam tipe data number
}