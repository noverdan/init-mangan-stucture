import React, { useContext, useState, useEffect } from 'react';
import NavbarUser from '../components/NavbarUser';
import { SearchProvider } from '../context/SearchProvider';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { DataContext } from '../context/ContextProvider';
import { PopUpQuestion } from '../components/PopUp';
import Loader from '../components/Loader';
import axios from 'axios';
import Card2 from '../components/Card2';

const urlPesanan = import.meta.env.VITE_URL_ORDERS
const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenus = import.meta.env.VITE_URL_MENUS
const urlSeller = import.meta.env.VITE_URL_SELLERS
const urlUser = import.meta.env.VITE_URL_USER

export default function ListDibatalkan() {
    const { isLoggedIn, setIsLoggedIn } = useContext(DataContext)
    const token = JSON.parse(localStorage.getItem("token"))
    const [dataPesanan, setDataPesanan] = useState([])
    const [dataPaket, setDataPaket] = useState([])
    const [dataMenu, setDataMenu] = useState([])
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchPesanan()
    }, [])
    useEffect(() => {
        dataPesanan.map(item => {
            fetchPaket(item.idPaket).then((res) => setDataPaket(prev => [...prev, res]))
            fetchMenu(item.idMenu).then((res) => setDataMenu(prev => [...prev, res]))
        })
    }, [dataPesanan])

    function fetchPesanan() {
        setLoading(true)
        axios.get(`${urlPesanan}?idUser=${token.id}&statusCode=-1`)
            .then((res) => {
                setDataPesanan(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }
    async function fetchPaket(id) {
        setLoading(true)
        try {
            const res = await axios.get(`${urlPackages}/${id}`)
            setLoading(false)
            return await res.data
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }
    async function fetchMenu(id) {
        setLoading(true)
        try {
            const res = await axios.get(`${urlMenus}/${id}`)
            setLoading(false)
            return await res.data
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    if (!isLoggedIn) {
        return (
            <>
                <SearchProvider>
                    <NavbarUser />
                </SearchProvider>
                <PopUpQuestion isOpen={true} message={"Login Terlebih Dahulu."} onCancel={() => navigate(-1, { replace: true })} onClose={() => navigate(-1)} onProcess={() => navigate("/login", { replace: true })} />
            </>
        )
    }

    return (
        <>
            <SearchProvider>
                <NavbarUser />
            </SearchProvider>
            <main className="pt-16 pb-5 w-[360px] mx-auto">
                <section className="flex items-center mt-5 relative">
                    <button onClick={() => navigate(-1)} className="text-primary-100 absolute left-0">
                        <Icon icon="material-symbols:arrow-back" width={27} />
                    </button>
                    <h1 className="mx-auto text-primary-100 font-bold">Pesanan Dibatalkan</h1>
                </section>
                <hr className="my-4" />
                <section className={dataPesanan.length ? "hidden" : "flex flex-col"}>
                    <h1 className="mx-auto mt-5 font-bold text-gray-400">Belum ada pesanan saat ini.</h1>
                    <h1 className="mx-auto font-bold text-gray-400">......</h1>
                </section>
                <section className="flex flex-col gap-4">
                    {
                        dataPesanan.map(pesanan => {
                            const paket = dataPaket.filter(item => item.id == pesanan.idPaket);
                            const menu = dataMenu.filter(item => item.id == pesanan.idMenu);
                            return (
                                <Card2 onClick={() => navigate(`/pesanan/dibatalkan/${pesanan.id}`)} key={pesanan.id} image={menu.length ? menu[0].gambarMenu : ""}
                                    packageName={paket.length ? paket[0].namaPaket : ""} menuName={menu.length ? menu[0].namaMenu : ""} sellerName={"Katering Mak Limah"} menuPrice={menu.length ? menu[0].hargaMenu : ""} totalPrice={pesanan.totalHarga} orderDate={pesanan.tanggalPesan} qty={pesanan.porsi} />
                            )
                        })
                    }
                </section>
            </main>
            <Loader show={isLoading} />
        </>
    )
}