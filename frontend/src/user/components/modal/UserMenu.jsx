import { useContext, useState } from 'react';
import { DataContext } from '../../context/ContextProvider';
import { Icon } from '@iconify/react';

function UserMenu() {
    const { isModalOpen, setModalOpen } = useContext(DataContext)
    const [isSubPesanan, setSubPesanan] = useState(false)

    function openSubPesanan() {
        if (isSubPesanan) {
            setSubPesanan(false)
        } else if (!isSubPesanan) {
            setSubPesanan(true)
        }
    }

    return (
        <div>
            <div className={isModalOpen ? 'flex h-screen w-full bg-black bg-opacity-20 overflow-y-hidden fixed top-0 z-[19]' : 'hidden'}>
                <div className='w-[360px] mx-auto md:w-full md:px-20'>
                    <div className='w-72 h-fit bg-white p-6 mt-20 ml-auto rounded-md z-[21]'>{/* Container Menu */}
                        <div className='flex gap-4 items-center mb-3 w-full cursor-pointer'> {/* Profile */}
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
                        <div className='cursor-pointer'>{/* Pesanan */}
                            <div className='flex items-center gap-4' onClick={openSubPesanan}>
                                <Icon icon="gridicons:product" className='text-primary-100' width={18} />
                                <p className='select-none text-primary-100 font-medium'>Pesanan</p>
                                <Icon icon="ooui:next-ltr" className={isSubPesanan ? 'rotate-90 text-primary-100 ml-5' : 'rotate-0 text-primary-100 ml-5'} width={10} />
                            </div>
                        </div>
                        <SubPesanan isClick={isSubPesanan} />
                        <hr className='my-2 border-primary-100 border-opacity-30' />
                        <div className='cursor-pointer'>{/* Chat */}
                            <div className='flex items-center gap-4'>
                                <Icon icon="bx:chat" className='text-primary-100' width={19} />
                                <p className='select-none text-primary-100 font-medium'>Chat</p>
                            </div>
                        </div>
                        <hr className='my-2 border-primary-100 border-opacity-30' />
                        <div className='cursor-pointer'>{/* Hubungi Kami */}
                            <div className='flex items-center gap-4'>
                                <Icon icon="tdesign:service" className='text-primary-100' width={18} />
                                <p className='select-none text-primary-100 font-medium'>Hubungi Kami</p>
                            </div>
                        </div>
                        <hr className='my-2 border-primary-100 border-opacity-30' />
                        <div className='cursor-pointer'>{/* Logout */}
                            <div className='flex items-center gap-4'>
                                <Icon icon="material-symbols:logout-sharp" className='text-primary-100' width={19} />
                                <p className='select-none text-primary-100 font-medium'>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubPesanan({ isClick }) {
    // const [isClick, setClick] = useState(false)
    if (isClick) {
        return (
            <div className='cursor-pointer'>{/* Sub Pesanan */}
                <hr className='my-2 ml-8 border-primary-100 border-opacity-30' />
                <div className='flex ml-12 items-center '>
                    <p className='select-none text-primary-100 font-medium'>Belum Bayar</p>
                </div>
                <hr className='my-2 ml-8 border-primary-100 border-opacity-30' />
                <div className='flex ml-12 items-center '>
                    <p className='select-none text-primary-100 font-medium'>Diproses</p>
                </div>
                <hr className='my-2 ml-8 border-primary-100 border-opacity-30' />
                <div className='flex ml-12 items-center '>
                    <p className='select-none text-primary-100 font-medium'>Selesai</p>
                </div>
                <hr className='my-2 ml-8 border-primary-100 border-opacity-30' />
                <div className='flex ml-12 items-center '>
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

