import React, { useEffect, useState } from 'react';
import Bintang1 from '../../assets/stars1.svg'
import Bintang2 from '../../assets/stars2.svg'
import Bintang3 from '../../assets/stars3.svg'
import Bintang4 from '../../assets/stars4.svg'
import Bintang5 from '../../assets/stars5.svg'
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import Card2 from '../components/Card2';
import Rp from '../../utils/Rupiah';
import axios from 'axios';
import NotFound from './NotFound';
import Loader from '../components/Loader';
import { PopUpAlert, PopUpQuestion, PopUpSucces } from '../components/PopUp';

const urlPesanan = import.meta.env.VITE_URL_ORDERS
const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenu = import.meta.env.VITE_URL_MENUS
const urlSeller = import.meta.env.VITE_URL_SELLERS
const urlUser = import.meta.env.VITE_URL_USER
const urlReview = import.meta.env.VITE_URL_REVIEWS

export default function Ulas() {
    const { idPesanan } = useParams()
    const navigate = useNavigate()
    const [dataPesanan, setDataPesanan] = useState({})
    const [dataMenu, setDataMenu] = useState({})
    const [dataPackages, setDataPackages] = useState({})
    const [dataSeller, setDataSeller] = useState({})
    const [dataUser, setDataUser] = useState({})
    const [responseCode, setResponseCode] = useState()
    const [bintang, setBintang] = useState(Bintang5)
    const [selectedBintang, setSelectedBintang] = useState(5)
    const [ulasanInput, setUlasanInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isPopUp, setIsPopUp] = useState({ success: false, question: false, alert: false })

    useEffect(() => {
        axios.get(`${urlPesanan}/${idPesanan}`)
            .then((res) => {
                const data = res.data
                if (data.statusCode == 2) {
                    setDataPesanan(data)
                    fetchDataPackages(data.idPaket)
                    fetchDataMenu(data.idMenu)
                    fetchDataUser(data.idUser)
                } else {
                    setResponseCode(404)
                }
            })
            .catch((err) => {
                console.log(err);
                setResponseCode(404)
            })
    }, [])
    useEffect(() => {
        if (selectedBintang == 5) {
            setBintang(Bintang5)
        } else if (selectedBintang == 4) {
            setBintang(Bintang4)
        }
        else if (selectedBintang == 3) {
            setBintang(Bintang3)
        } else if (selectedBintang == 2) {
            setBintang(Bintang2)
        } else if (selectedBintang == 1) {
            setBintang(Bintang1)
        }
    }, [selectedBintang])

    function fetchDataPackages(id) {
        axios.get(`${urlPackages}/${id}`)
            .then((res) => {
                const data = res.data
                setDataPackages(data)
                fetchDataSeller(data.idPenjual)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function fetchDataMenu(id) {
        axios.get(`${urlMenu}/${id}`)
            .then((res) => {
                const data = res.data
                setDataMenu(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function fetchDataSeller(id) {
        axios.get(`${urlSeller}/${id}`)
            .then((res) => {
                const data = res.data
                setDataSeller(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function fetchDataUser(id) {
        axios.get(`${urlUser}/${id}`)
            .then((res) => {
                const data = res.data
                setDataUser(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function kirimUlasan() {
        const ulasan = {
            idPaket: dataPackages.id,
            ulasan: ulasanInput,
            bintang: selectedBintang,
            tanggal: getDateNow(),
            user: dataUser.nama
        }
        const post = {
            method: "POST",
            url: urlReview,
            data: ulasan
        }
        setIsLoading(true)
        axios.request(post)
            .then((res) => {
                console.log(res);
                setIsLoading(false)
                setIsPopUp({ ...isPopUp, success: true })
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }
    function getDateNow() {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 7);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const formattedDate = pad(day) + '-' + pad(month) + '-' + year;
        function pad(number) {
            return (number < 10 ? '0' : '') + number;
        }
        return formattedDate
    }

    if (responseCode == 404) {
        return (
            <>
                <NotFound />
            </>
        )
    }

    return (
        <div className='w-[360px] mx-auto'>
            <header className="flex items-center my-5 relative">
                <button onClick={() => navigate(-1)} className="text-primary-100 absolute left-0">
                    <Icon icon="material-symbols:arrow-back" width={27} />
                </button>
                <h1 className="mx-auto text-primary-100 font-bold">Ulas Katering</h1>
            </header>
            <main className='mb-5'>
                <div className='mt-4 flex flex-col gap-2 w-full p-4 border-2 rounded border-primary-100'>
                    <div className='flex gap-2'>
                        <div className='relative w-28 h-28 aspect-square rounded bg-gray-300 bg-cover bg-center border border-gray-200 shadow' style={{ backgroundImage: `url(${dataMenu.gambarMenu})` }}>
                            <p className='bg-white shadow w-fit max-w-[100px] px-2 py-1 rounded text-[8px] select-none absolute right-1 top-1 overflow-hidden text-ellipsis whitespace-nowrap'>{dataMenu.namaMenu}</p>
                        </div>
                        <div>
                            <h1 className='max-h-10 text-primary-100 leading-5 font-medium overflow-hidden text-ellipsis whitespace-pre-wrap line-clamp-2 cursor-default'>{dataPackages.namaPaket}</h1>
                            <div className='flex items-center gap-1 text-sm font-medium text-accent-200 mt-1'>
                                <Icon icon="entypo:shop" width={14} />
                                <h4 id='seller' >{dataSeller.nama}</h4>
                            </div>
                            <h3 className='text-accent-200 text-sm'>{dataMenu.namaMenu}</h3>
                            <h1 className='text-accent-200 font-semibold'>{Rp(dataMenu.hargaMenu)}</h1>

                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-primary-100'>Isi Menunya :</h1>
                        <ul className='grid grid-cols-2 ml-4 list-disc text-accent-200'>
                            {dataMenu.isiMenu ? dataMenu.isiMenu.map((item, index) => <li key={index}>{item}</li>) : <li></li>}
                        </ul>
                    </div>
                </div>
                <div className='mt-4 flex flex-col gap-2 w-full p-4 border-2 rounded border-primary-100 relative'>
                    <img src={bintang} width={211} alt="" className='absolute z-10' />
                    <div className='flex gap-2 items-center w-52 h-10 bg-transparent z-20'>
                        <button onClick={() => setSelectedBintang(1)} className='bg-transparent w-full h-full'></button>
                        <button onClick={() => setSelectedBintang(2)} className='bg-transparent w-full h-full'></button>
                        <button onClick={() => setSelectedBintang(3)} className='bg-transparent w-full h-full'></button>
                        <button onClick={() => setSelectedBintang(4)} className='bg-transparent w-full h-full'></button>
                        <button onClick={() => setSelectedBintang(5)} className='bg-transparent w-full h-full'></button>
                    </div>
                    <div className='mb-2 mt-1 rounded border flex items-start border-primary-100'>
                        <textarea id='alamat'
                            type="address"
                            placeholder='Masukan Ulasan'
                            value={ulasanInput}
                            onChange={(e) => setUlasanInput(e.target.value)}
                            className='focus:ring-0 border-none my-1 w-full h-10 min-h-[117px] placeholder:text-gray-400 ' />
                    </div>
                    <button onClick={() => ulasanInput ? setIsPopUp({ ...isPopUp, question: true }) : setIsPopUp({ ...isPopUp, alert: true })} className='w-full bg-primary-100 py-2 text-white rounded hover:bg-opacity-70 active:bg-opacity-100'>Kirim Ulasan</button>
                </div>
            </main>
            <Loader show={isLoading} />
            <PopUpQuestion isOpen={isPopUp.question} message={"Apakah anda yakin mengirim ulasan ini?"} onProcess={kirimUlasan} onClose={() => setIsPopUp({ ...isPopUp, question: false })} onCancel={() => setIsPopUp({ ...isPopUp, question: false })} />
            <PopUpAlert isOpen={isPopUp.alert} message={"Masukan ulasan terlebih dahulu"} onProcess={() => setIsPopUp({ ...isPopUp, alert: false })} />
            <PopUpSucces isOpen={isPopUp.success} message={"Berhasil menambahkan ulasan, Terimakasih telah menambahkan ulasan."} onProcess={() => navigate(-2)} />
        </div>
    )
}