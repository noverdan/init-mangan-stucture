import LocalButton from './Button'
import LogoMangan from '/logo-mangan.svg'

function Navbar() {
    return (
        <div className='flex justify-between items-center px-16 h-20 bg-white '>
            <div className='flex gap-10 h-full items-center'>
                <img src={LogoMangan} alt="" width={100} />
                <div className='flex gap-2'>
                    <span>Home</span>
                    <span>Home</span>
                    <span>Home</span>
                    <span>Home</span>
                </div>
            </div>
            <div className='flex gap-2'>
                <LocalButton name="Login" tipe='primary' />

            </div>
        </div>
    )
}
export default Navbar