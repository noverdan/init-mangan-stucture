import axios from "axios";
import Rp from "../../utils/Rupiah";
import Card2 from "../components/Card2";
import NavbarUser from "../components/NavbarUser";
import { SearchProvider } from "../context/SearchProvider";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { Divide } from "hamburger-react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { DataContext } from "../context/ContextProvider";

const urlPesanan = import.meta.env.VITE_URL_ORDERS
const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenus = import.meta.env.VITE_URL_MENUS
const urlSeller = import.meta.env.VITE_URL_SELLERS
const urlUser = import.meta.env.VITE_URL_USER

export default function ListBelumBayar() {
    const { isLoggedIn, token, setToken } = useContext(DataContext)
    console.log("Login: ", isLoggedIn);
    // const token = JSON.parse(localStorage.getItem("token"))
    const [dataPesanan, setDataPesanan] = useState([])
    const [dataPaket, setDataPaket] = useState([])
    const [dataMenu, setDataMenu] = useState([])
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(token);
        if (token) {
            fetchPesanan()
        }
    }, [isLoggedIn])
    useEffect(() => {
        dataPesanan.map(item => {
            fetchPaket(item.idPaket).then((res) => setDataPaket(prev => [...prev, res]))
            fetchMenu(item.idMenu).then((res) => setDataMenu(prev => [...prev, res]))
        })
    }, [dataPesanan])

    function fetchPesanan() {
        setLoading(true)
        axios.get(`${urlPesanan}?idUser=${token.id}&statusCode=0`)
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

    // if (!isLoggedIn) {
    //     return (
    //         <>
    //             <SearchProvider>
    //                 <NavbarUser />
    //             </SearchProvider>
    //             <h1 className="mt-16">Kosong</h1>
    //         </>
    //     )
    // }

    return (
        <>
            <SearchProvider>
                <NavbarUser />
            </SearchProvider>
            {isLoggedIn ? <h1>mati</h1> : <h1>p</h1>}
            <main className="pt-16 pb-5 w-[360px] mx-auto">
                <section className="flex items-center mt-5 relative">
                    <button onClick={() => navigate(-1)} className="text-primary-100 absolute left-0">
                        <Icon icon="material-symbols:arrow-back" width={27} />
                    </button>
                    <h1 className="mx-auto text-primary-100 font-bold">Pesanan Belum Bayar</h1>
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
                                <Card2 onClick={() => navigate(`/pesanan/belumbayar/${pesanan.id}`)} key={pesanan.id} image={menu.length ? menu[0].gambarMenu : ""}
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