import { useContext, useState } from 'react';
import { DataContext } from '../../context/ContextProvider';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { PopUpQuestion } from '../PopUp';

function UserMenu({ isOpen }) {
    const { isLoggedIn, setIsLoggedIn } = useContext(DataContext)
    const [isSubPesanan, setSubPesanan] = useState(false)
    const [isPopUp, setPopUp] = useState(false)
    const navigate = useNavigate()

    function openSubPesanan() {
        if (isSubPesanan) {
            setSubPesanan(false)
        } else if (!isSubPesanan) {
            setSubPesanan(true)
        }
    }
    function loggedOut() {
        localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }

    return (
        <>
            <div className={isOpen ? 'flex h-screen w-full bg-black bg-opacity-20 overflow-y-hidden fixed top-0 z-[19]' : 'hidden'}>
                <div className='w-[360px] mx-auto md:w-full md:px-20'>
                    <div className='w-72 h-fit bg-white p-6 mt-20 ml-auto rounded-md z-[21]'>{/* Container Menu */}
                        <div className={isLoggedIn ? 'hidden' : 'flex gap-4'}>
                            <button onClick={() => navigate("/register")} className='bg-white text-primary-100 font-semibold border border-primary-100 w-full py-1 rounded hover:bg-gray-200'>Daftar</button>
                            <button onClick={() => navigate("/login")} className='bg-primary-100 text-white w-full py-1 rounded hover:bg-opacity-75'>Login</button>
                        </div>
                        <div className={isLoggedIn ? 'flex gap-4 items-center mb-3 w-full cursor-pointer' : 'hidden'}> {/* Profile */}
                            <div className='bg-gray-300 w-12 h-12 rounded-full'></div>
                            <div className='w-40'>
                                <p className='select-none text-primary-100 font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>John Doe Sumanggala Putrsa Samsudin</p>
                                <div className='flex items-center gap-2'>
                                    <p className='select-none text-primary-100 text-xs'>Profil</p>
                                    <Icon icon="ooui:next-ltr" className='text-primary-100' width={8} />
                                </div>
                            </div>
                        </div>
                        <hr className='my-2 border-primary-100 border-opacity-30' />
                        <div onClick={() => navigate("/homepage")} className='cursor-pointer'>{/* Hubungi Kami */}
                            <div className='flex items-center gap-4'>
                                <Icon icon="majesticons:home-line" className='text-primary-100' width={19} />
                                <p className='select-none text-primary-100 font-medium'>Homepage</p>
                            </div>
                        </div>
                        <hr className='my-2 border-primary-100 border-opacity-30' />
                        <div className={isLoggedIn ? 'block cursor-pointer' : 'hidden'}>{/* Pesanan */}
                            <div className='flex items-center gap-4' onClick={openSubPesanan}>
                                <Icon icon="gridicons:product" className='text-primary-100' width={18} />
                                <p className='select-none text-primary-100 font-medium'>Pesanan</p>
                                <Icon icon="ooui:next-ltr" className={isSubPesanan ? 'rotate-90 text-primary-100 ml-5' : 'rotate-0 text-primary-100 ml-5'} width={10} />
                            </div>
                        </div>
                        <SubPesanan isClick={isSubPesanan} />
                        <hr className={isLoggedIn ? 'block my-2 border-primary-100 border-opacity-30' : 'hidden'} />
                        <div onClick={() => console.log("Chat")} className={isLoggedIn ? 'block cursor-pointer' : 'hidden'}>{/* Chat */}
                            <div className='flex items-center gap-4'>
                                <Icon icon="bx:chat" className='text-primary-100' width={19} />
                                <p className='select-none text-primary-100 font-medium'>Chat</p>
                            </div>
                        </div>
                        <hr className={isLoggedIn ? 'block my-2 border-primary-100 border-opacity-30' : 'hidden'} />
                        <div onClick={() => console.log("Contact Us")} className='cursor-pointer'>{/* Hubungi Kami */}
                            <div className='flex items-center gap-4'>
                                <Icon icon="tdesign:service" className='text-primary-100' width={18} />
                                <p className='select-none text-primary-100 font-medium'>Hubungi Kami</p>
                            </div>
                        </div>
                        <hr className='my-2 border-primary-100 border-opacity-30' />
                        <div onClick={() => setPopUp(true)} className={isLoggedIn ? 'block cursor-pointer' : 'hidden'}>{/* Logout */}
                            <div className='flex items-center gap-4'>
                                <Icon icon="material-symbols:logout-sharp" className='text-primary-100' width={19} />
                                <p className='select-none text-primary-100 font-medium'>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PopUpQuestion isOpen={isPopUp} message={"Apakah anda yakin ingin logout?"} onProcess={() => loggedOut()} onCancel={() => setPopUp(false)} onClose={() => setPopUp(false)} />
        </>
    );
}

function SubPesanan({ isClick }) {
    // const [isClick, setClick] = useState(false)
    const navigate = useNavigate()

    if (isClick) {
        return (
            <div className='cursor-pointer'>{/* Sub Pesanan */}
                <hr className='my-2 ml-8 border-primary-100 border-opacity-30' />
                <div onClick={() => navigate("/pesanan/belumbayar")} className='flex ml-12 items-center '>
                    <p className='select-none text-primary-100 font-medium'>Belum Bayar</p>
                </div>
                <hr className='my-2 ml-8 border-primary-100 border-opacity-30' />
                <div onClick={() => navigate("/pesanan/diproses")} className='flex ml-12 items-center '>
                    <p className='select-none text-primary-100 font-medium'>Diproses</p>
                </div>
                <hr className='my-2 ml-8 border-primary-100 border-opacity-30' />
                <div onClick={() => navigate("/pesanan/selesai")} className='flex ml-12 items-center '>
                    <p className='select-none text-primary-100 font-medium'>Selesai</p>
                </div>
                <hr className='my-2 ml-8 border-primary-100 border-opacity-30' />
                <div onClick={() => navigate("/pesanan/dibatalkan")} className='flex ml-12 items-center '>
                    <p className='select-none text-primary-100 font-medium'>Dibatalkan</p>
                </div>
            </div>
        )
    }
    if (!isClick) {
        return
    }
}

export default UserMenu

