import axios from "axios";
import Rp from "../../utils/Rupiah";
import Card2 from "../components/Card2";
import NavbarUser from "../components/NavbarUser";
import { SearchProvider } from "../context/SearchProvider";
import { Icon } from "@iconify/react";

const urlPesanan = import.meta.env.VITE_URL_ORDERS
const urlPackages = import.meta.env.VITE_URL_PACKAGES
const urlMenus = import.meta.env.VITE_URL_MENUS
const urlSeller = import.meta.env.VITE_URL_SELLERS
const urlUser = import.meta.env.VITE_URL_USER

export default function ListBelumBayar() {
    const idUser = 0

    function fetchPesanan() {
        axios.get(`${urlPesanan}?idUser=${idUser}`)
    }

    return (
        <>
            <SearchProvider>
                <NavbarUser />
            </SearchProvider>
            <main className="pt-16 w-[360px] mx-auto">
                <section className="flex items-center mt-5 relative">
                    <button className="text-primary-100 absolute left-0">
                        <Icon icon="material-symbols:arrow-back" width={27} />
                    </button>
                    <h1 className="mx-auto text-primary-100 font-bold">Pesanan Belum Bayar</h1>
                </section>
                <hr className="my-4" />
                <section className="flex flex-col gap-4">
                    <Card2 onClick={() => console.log("object")}
                        image={"https://blog.bankmega.com/wp-content/uploads/2022/10/Makanan-tradisional-indonesia.jpg"} menuName={"Menu Roti Biadap"} sellerName={"Katering Mak Limah"} menuPrice={23800} totalPrice={1297200} orderDate={"12/12/2023, 12:12 WIB"} qty={59} />
                    <Card2 />

                </section>
            </main>
        </>
    )
}