import Mascot from "../../assets/mascot-menganga.png"
import { Icon } from '@iconify/react';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PopUpAlert, PopUpSucces } from "../../user/components/PopUp";
const urlUser = 'http://localhost:3000/user'

function RegisterSeller() {
    const [dataForm, setDataForm] = useState({
        nama: '',
        email: '',
        hp: '',
        password: ''
    })
    const isDataFormFill = Object.values(dataForm).every((value) => value);
    console.log(dataForm);
    const [isAgree, setIsAgree] = useState(false)
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")
    const [openSucces, setOpenSucces] = useState(false);
    const [succesMessage, setSuccesMessage] = useState("")
    const navigate = useNavigate()

    function addDataForm(prop, value) {
        setDataForm((prev) => ({ ...prev, [prop]: value }))
    }
    const handleCheckboxChange = () => {
        setIsAgree((prevChecked) => !prevChecked);
    };

    function validationData() {
        if (isDataFormFill) {
            if (isAgree) {
                function isEmailValid(email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                }
                if (isEmailValid(dataForm.email)) {
                    if (!isNaN(dataForm.hp)) {
                        function isPasswordValid(password) {
                            const isLengthValid = password.length >= 8;
                            const hasLetterAndDigit = /[a-zA-Z]/.test(password) && /\d/.test(password);
                            return isLengthValid && hasLetterAndDigit;
                        }
                        if (isPasswordValid(dataForm.password)) {
                            isEmailUsed(dataForm.email)
                                .then((res) => {
                                    if (res) {
                                        setOpenAlert(true)
                                        setAlertMessage("Email yang anda masukan sudah terdaftar, coba gunakan email yang lain.")
                                    } else {
                                        handlePostUser()
                                    }
                                }).catch((err) => {
                                    setOpenAlert(true)
                                    setAlertMessage(err.message)
                                    console.log(err);
                                })
                        } else {
                            setOpenAlert(true)
                            setAlertMessage("Panjang password minimal 8 karakter dan password harus kombinasi huruf dan angka.")
                        }
                    } else {
                        setOpenAlert(true)
                        setAlertMessage("Masukan nomor HP yang valid.")
                    }
                } else {
                    setOpenAlert(true)
                    setAlertMessage("Masukan Email yang valid.")
                }
            } else {
                setOpenAlert(true)
                setAlertMessage("Harap baca dan klik setuju syarat dan ketentuan kami")
            }
        } else {
            setOpenAlert(true)
            setAlertMessage("Mohon isi seluruh data dengan lengkap.")
        }
    }

    const handlePostUser = async () => {
        try {
            const data = { ...dataForm, foto: "", alamat: "" }
            const response = await axios.post(urlUser, data);
            if (response.status == 201) {
                setOpenSucces(true)
                setSuccesMessage("Registrasi Berhasil, selanjutnya silahkan Login")
            } else {
                setOpenAlert(true)
                setAlertMessage(`Mohon maaf proses Registrasi gagal\ncode : ${response.status}`)
            }

            console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isEmailUsed = async (email) => {
        try {
            const res = await axios.get(`${urlUser}?email=${email}`)
            const data = res.data
            if (data.length !== 0) {
                // console.log(true);
                return true
            } else {
                // console.log(false);
                return false
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                    <label className="font-medium text-primary-100" htmlFor="nama">Nama Usaha</label>
                    <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                        <label className="flex items-center h-fit" htmlFor="nama"><Icon className="text-primary-100" icon="fluent:person-16-filled" /></label>
                        <input onChange={(e) => addDataForm("nama", e.target.value)} value={dataForm.nama}
                            className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="nama" type="text" placeholder="Masukan nama" />
                    </div>

                    <label className="font-medium text-primary-100" htmlFor="email">Email</label>
                    <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                        <label className="flex items-center h-fit" htmlFor="email"><Icon icon="ic:round-email" className="text-primary-100" /></label>
                        <input onChange={(e) => addDataForm("email", e.target.value)} value={dataForm.email}
                            className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40 " id="email" type="email" placeholder="example@mail.com" />
                    </div>

                    <label className="font-medium text-primary-100" htmlFor="telepon">No Telepon</label>
                    <div className="flex w-full mb-2 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                        <label className="flex items-center h-fit" htmlFor="telepon"><Icon icon="foundation:telephone" className="text-primary-100" /></label>
                        <input onChange={(e) => addDataForm("hp", e.target.value)} value={dataForm.hp}
                            className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="telepon" type="tel" placeholder="Nomor Telepon" />
                    </div>

                    <label className="font-medium text-primary-100" htmlFor="password">Password</label>
                    <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                        <label className="flex items-center h-fit" htmlFor="password"><Icon icon="mdi:password" className="text-primary-100" /></label>
                        <input onChange={(e) => addDataForm("password", e.target.value)} value={dataForm.password}
                            className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="password" type="password" placeholder="Password" />
                    </div>

                    <div className="">
                        <input checked={isAgree} onChange={handleCheckboxChange} className="mr-2" type="checkbox" name="policy" id="policy" />
                        <label className="text-accent-200" htmlFor="policy">Saya setuju dengan <span className="text-primary-100 font-medium"><a href="/PrivacyPolicy">Syarat & Ketentuan</a></span> yang berlaku</label>
                    </div>
                </form>
                <button onClick={validationData} className="w-full py-2 rounded-md mt-4 font-medium bg-primary-100 text-white hover:bg-primary-200 active:bg-primary-100">Daftar</button>
                <div className="flex gap-2 mt-4">
                    <p className="font-medium text-accent-200">Sudah punya akun?</p>
                    <button className="font-bold text-primary-100 hover:text-primary-200 active:text-primary-100">Login</button>
                </div>
            </div>
            <PopUpAlert isOpen={openAlert} onClose={() => setOpenAlert(false)} message={alertMessage} onProcess={() => setOpenAlert(false)} />
            <PopUpSucces isOpen={openSucces} onClose={() => setOpenSucces(false)} message={succesMessage} onProcess={() => { navigate("/login") }} />
        </main>
    )
}

export default RegisterSeller