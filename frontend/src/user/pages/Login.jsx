import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Mascot from '../../assets/mascot-sip.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PopUpAlert, PopUpSucces } from '../components/PopUp';
import Loader from '../components/Loader';

const urlUser = import.meta.env.VITE_URL_USER

function Login() {
    const [inputUser, setInputUser] = useState({ email: "", pass: "" })
    const [isPopUpAlert, setPopUpAlert] = useState(false)
    const [isPopUpSuccess, setPopUpSuccess] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [userData, setUserData] = useState({ id: "" })
    const navigate = useNavigate()
    function goBack() {
        navigate(-1)
    }
    function fetchData() {
        axios.get(`${urlUser}?email=${inputUser.email}`)
            .then((res) => {
                const data = res.data[0]
                if (data) {
                    if (data.password === inputUser.pass) {
                        setUserData({ id: data.id })
                        setPopUpMessage("Berhasil Login.")
                        setPopUpSuccess(true)
                    } else {
                        setPopUpMessage("Password Salah.")
                        setPopUpAlert(true)
                    }
                } else {
                    setPopUpMessage("Email Tidak Ditemukan.")
                    setPopUpAlert(true)
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }
    function validation() {
        if (inputUser.email && inputUser.pass) {
            if (validateEmail(inputUser.email)) {
                if (inputUser.pass.length < 8) {
                    setPopUpMessage("Masukan Password dangan benar.")
                    setPopUpAlert(true)
                } else {
                    setLoading(true)
                    fetchData()
                }
            } else {
                setPopUpMessage("Masukan Email dengan benar.")
                setPopUpAlert(true)
            }
        } else {
            setPopUpMessage("Masukan Email dan Password.")
            setPopUpAlert(true)
        }

        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    }
    function loggenIn() {
        const simulateToken = JSON.stringify(userData)
        localStorage.setItem("token", simulateToken)
        navigate("/homepage", { replace: true })
    }

    return (
        <>
            <main className="mx-auto w-[360px] py-5">
                <div>
                    <div className='flex justify-between'>
                        <button onClick={goBack} className="flex items-center text-primary-100 font-bold hover:text-primary-200 active:text-primary-100"><span><Icon icon="ic:baseline-arrow-back-ios" /></span>Kembali</button>
                    </div>
                    <header>
                        <p className='mt-4 font-bold text-primary-100 text-lg text-center'>Selamat Datang</p>
                        <p className='font-medium text-accent-200 text-center'>Masuk ke akun kamu yang sudah terdaftar</p>
                        <form className='mt-4'>
                            <label className="font-medium text-primary-100" htmlFor="email">Email</label>
                            <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                                <label className="flex items-center h-fit" htmlFor="email"><Icon icon="ic:round-email" className="text-primary-100" /></label>
                                <input onChange={(e) => setInputUser({ ...inputUser, email: e.target.value })} value={inputUser.email}
                                    className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40 " id="email" name='email' type="email" placeholder="example@mail.com" autoComplete='on' />
                            </div>
                            <label className="font-medium text-primary-100" htmlFor="password">Password</label>
                            <div className="flex w-full mb-1 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                                <label className="flex items-center h-fit" htmlFor="password"><Icon icon="mdi:password" className="text-primary-100" /></label>
                                <input onChange={(e) => setInputUser({ ...inputUser, pass: e.target.value })} value={inputUser.pass}
                                    className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="password" name='password' type="password" placeholder="Password" autoComplete='off' />
                            </div>
                            <a href="" className='font-medium text-sm text-primary-100 hover:text-primary-200 active:text-primary-100'>Lupa Password?</a>
                        </form>
                        <button onClick={() => validation()} className="w-full py-2 rounded-md mt-4 font-medium bg-primary-100 text-white hover:bg-primary-200 active:bg-primary-100">Login</button>
                        <div className="flex gap-2 mt-4">
                            <p className="font-medium text-accent-200 text-sm">Belum punya akun?</p>
                            <a href='/register' className="font-bold text-sm text-primary-100 hover:text-primary-200 active:text-primary-100">Daftar</a>
                        </div>
                    </header>
                </div>
                <div>
                    <img src={Mascot} alt="" className='hidden' />
                </div>
            </main>
            <Loader show={isLoading} />
            <PopUpAlert isOpen={isPopUpAlert} message={popUpMessage} onProcess={() => setPopUpAlert(false)} onClose={() => setPopUpAlert(false)} />
            <PopUpSucces isOpen={isPopUpSuccess} message={popUpMessage} onProcess={() => loggenIn()} onClose={() => setPopUpSuccess(true)} />
        </>
    )
}
export default Login