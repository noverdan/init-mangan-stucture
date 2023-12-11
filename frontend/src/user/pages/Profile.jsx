import React, { useContext, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import emptyProfile from '../../assets/empty-profile.png'
import { DataContext } from '../context/ContextProvider';
import axios from 'axios';
import Loader from '../components/Loader';
import { PopUpQuestion, PopUpSucces } from '../components/PopUp';

const urlUser = import.meta.env.VITE_URL_USER

export default function Profile() {
    const navigate = useNavigate()
    const { isLoggedIn, token } = useContext(DataContext)
    const [dataUser, setDataUser] = useState({})
    const [userInput, setUserInput] = useState({
        nama: "",
        email: "",
        hp: "",
        alamat: "",
        foto: ""
    })
    console.log(userInput);
    const [isLoading, setIsLoading] = useState(false)
    const [isPop, setPop] = useState({ alert: false, success: false, question: false })

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${urlUser}/${token.id}`)
            .then((res) => {
                const data = res.data
                console.log(res);
                setDataUser(data)
                setUserInput({ nama: data.nama, email: data.email, hp: data.hp, alamat: data.alamat, foto: data.foto ? data.foto : emptyProfile })
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }, [isLoggedIn])

    function updateData() {
        setIsLoading(true)
        const dataUpdate = {
            nama: userInput.nama,
            email: userInput.email,
            hp: userInput.hp,
            alamat: userInput.alamat
            // foto: ""
        }
        axios.patch(`${urlUser}/${token.id}`, dataUpdate)
            .then((res) => {
                console.log(res.status);
                setPop({ ...isPop, success: true, question: false })
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }
    function setImage(event) {
        const foto = URL.createObjectURL(event.target.files[0])
        if (foto.length == 0) {
            console.log("no file")
        } else {
            setUserInput({ ...userInput, foto: foto })
        }
    }

    return (
        <>
            <header className="flex items-center mt-5 relative w-[360px] mx-auto">
                <button onClick={() => navigate(-1)} className="text-primary-100 absolute left-0">
                    <Icon icon="material-symbols:arrow-back" width={27} />
                </button>
                <h1 className="mx-auto text-primary-100 font-bold">Profile</h1>
            </header>
            <hr className='my-4 border-gray-300' />
            <main>
                {/* Foto Profile */}
                <section>
                    <div className='flex relative justify-center mx-auto shadow-lg bg-gray-200 items-end bg-cover bg-center w-24 h-24 rounded-full' style={{ backgroundImage: `url(${userInput.foto})` }}>
                        <div className='absolute right-1 top-1'>
                            <div className='w-5 bg-transparent flex relative overflow-hidden'>
                                <input onChange={setImage} className='opacity-0 absolute' type="file" accept="image/*" />
                                <Icon icon="fa-solid:edit" className='text-primary-100 hover:text-opacity-60' width={20} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className=' w-[360px] mx-auto mb-5'>
                    <form className="mt-4">
                        <label className="font-medium text-primary-100" htmlFor="nama">Nama</label>
                        <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                            <label className="flex items-center h-fit" htmlFor="nama"><Icon className="text-primary-100" icon="fluent:person-16-filled" /></label>
                            <input onChange={(e) => setUserInput({ ...userInput, nama: e.target.value })} value={userInput.nama}
                                className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="nama" type="text" placeholder="Masukan nama" />
                        </div>

                        <label className="font-medium text-primary-100" htmlFor="email">Email</label>
                        <div className="flex w-full mb-4 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                            <label className="flex items-center h-fit" htmlFor="email"><Icon icon="ic:round-email" className="text-primary-100" /></label>
                            <input onChange={(e) => setUserInput({ ...userInput, email: e.target.value })} value={userInput.email}
                                className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40 " id="email" type="email" placeholder="example@mail.com" />
                        </div>

                        <label className="font-medium text-primary-100" htmlFor="telepon">No Telepon</label>
                        <div className="flex w-full mb-2 mt-1 px-2 items-center rounded-md border border-primary-100 focus-within:ring-1 focus-within:ring-primary-100">
                            <label className="flex items-center h-fit" htmlFor="telepon"><Icon icon="foundation:telephone" className="text-primary-100" /></label>
                            <input onChange={(e) => setUserInput({ ...userInput, hp: e.target.value })} value={userInput.hp}
                                className="px-0 pl-2 w-full border-none focus:ring-0 placeholder:text-black placeholder:text-opacity-40" id="telepon" type="tel" placeholder="Nomor Telepon" />
                        </div>
                        <label className='text-primary-100 py-0' htmlFor="alamat">Alamat</label>
                        <div className='mb-2 mt-1 rounded border flex items-start border-primary-100'>
                            <textarea id='alamat'
                                type="address"
                                placeholder='Masukan alamat lengkap'
                                value={userInput.alamat}
                                onChange={(e) => setUserInput({ ...userInput, alamat: e.target.value })}
                                className='focus:ring-0 border-none my-1 w-full h-10 min-h-[117px] placeholder:text-gray-400 ' />
                        </div>
                    </form>
                    <section>
                        <button onClick={() => setPop({ ...isPop, question: true })} className="w-full py-2 rounded-md mt-4 font-medium bg-primary-100 text-white hover:bg-primary-200 active:bg-primary-100">Simpan Perubahan</button>
                    </section>
                </section>
            </main>
            <Loader show={isLoading} />
            <PopUpQuestion
                isOpen={isPop.question} message={"Yakin ingin menyimpan perubahan pada Profil anda?"}
                onProcess={updateData} onCancel={() => setPop({ ...isPop, question: false })}
                onClose={() => setPop({ ...isPop, question: false })}
            />
            <PopUpSucces
                isOpen={isPop.success} message={"Data profile berhasil diupdate."}
                onProcess={() => setPop({ ...isPop, success: false })} onCancel={() => setPop({ ...isPop, success: false })}
            />
        </>
    )
}