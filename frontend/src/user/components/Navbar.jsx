import LocalButton from './Button'
import LogoMangan from '/logo-mangan.svg'

function Navbar() {
    return (
        <div className='flex justify-between items-center px-20 h-20 bg-white '>
            <div className='flex gap-28 h-full items-center'>
                <img src={LogoMangan} alt="" width={120} />
                <div className='flex gap-8 '>
                    <span>
                        <a href=""
                            className='font-bold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Home</a>
                    </span>
                    <span>
                        <a href=""
                            className='font-bold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Tentang Kami</a>
                    </span>
                    <span>
                        <a href=""
                            className='font-bold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Katering</a>
                    </span>
                    <span>
                        <a href=""
                            className='font-bold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Bergabung</a>
                    </span>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <a href="" className='font-semibold text-primary-100 hover:text-opacity-75 active:text-primary-100'>Daftar</a>
                <LocalButton name="Masuk" />
            </div>
        </div>
    )
}
export default Navbar