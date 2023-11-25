import Mascot from "../../assets/mascot-menganga.png"
import { Icon } from '@iconify/react';
import Button from "../components/Button";

function Register() {
    function goBack() {
        window.history.back()
    }
    return (
        <main className="flex py-5">
            <div className="mx-auto w-[360px]">
                <img className="hidden" src={Mascot} alt="Mascot" />
                <button onClick={goBack} className="flex items-center text-primary-100 font-bold hover:text-primary-200 active:text-primary-100"><span><Icon icon="ic:baseline-arrow-back-ios" /></span>Kembali</button>
                <p className="mt-6 text-center font-bold text-lg text-accent-200 ">Selamat Datang Orang Baru</p>
                <p className="mt-1 leading-2 text-accent-200 font-medium">Silahkan isi form di bawah ini dengan teliti dan ojo lali mangan</p>
                <form className="mt-4">
                    <label className="font-medium text-primary-100" htmlFor="nama">Nama</label>
                    <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                        <label className="flex items-center h-fit" htmlFor="nama"><Icon className="text-primary-100" icon="fluent:person-16-filled" /></label>
                        <input className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="nama" type="text" placeholder="Masukan nama" />
                    </div>

                    <label className="font-medium text-primary-100" htmlFor="email">Email</label>
                    <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                        <label className="flex items-center h-fit" htmlFor="email"><Icon icon="ic:round-email" className="text-primary-100" /></label>
                        <input className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40 " id="email" type="email" placeholder="example@mail.com" />
                    </div>

                    <label className="font-medium text-primary-100" htmlFor="telepon">No Telepon</label>
                    <div className="flex w-full mb-2 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                        <label className="flex items-center h-fit" htmlFor="telepon"><Icon icon="foundation:telephone" className="text-primary-100" /></label>
                        <input className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="telepon" type="tel" placeholder="Nomor Telepon" />
                    </div>

                    <label className="font-medium text-primary-100" htmlFor="password">Password</label>
                    <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                        <label className="flex items-center h-fit" htmlFor="password"><Icon icon="mdi:password" className="text-primary-100" /></label>
                        <input className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="password" type="password" placeholder="Password" />
                    </div>

                    <div className="">
                        <input className="mr-2" type="checkbox" name="policy" id="policy" />
                        <label className="text-accent-200" htmlFor="policy">Saya setuju dengan <span className="text-primary-100 font-medium"><a href="/PrivacyPolicy">Syarat & Ketentuan</a></span> yang berlaku</label>
                    </div>
                    <button className="w-full py-2 rounded-md mt-4 font-medium bg-primary-100 text-white hover:bg-primary-200 active:bg-primary-100" type="submit">Daftar</button>
                </form>
                <div className="flex gap-2 mt-4">
                    <p className="font-medium text-accent-200">Sudah punya akun?</p>
                    <button className="font-bold text-primary-100 hover:text-primary-200 active:text-primary-100">Login</button>
                </div>
            </div>
        </main>
    )
}

export default Register