import LocalButton from "../Button"
import JoinImg from "../../../assets/join-us.jpg"
import { NavLink } from "react-router-dom"

function Join() {
    return (
        <section className="lg:px-20 lg:w-full mx-auto lg:mx-0 w-[360px] py-10">
            <header className='font-semibold text-xl text-center text-primary-100'>Join With Us</header>
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-7">
                <div className="lg:w-[45%]">
                    <p className="font-bold">Anda punya usaha usaha katering tapi jangkauan pelanggannya masih kecil?</p>
                    <p className="mt-1 mb-4 lg:mb-0">Bergabung dengan kami dan temukan pelanggan anda secara lebih luas.</p>
                    <NavLink to='/register-seller' className="mt-5">
                        <LocalButton name='Bergabung Sekarang' />
                    </NavLink>
                </div>
                <div className="lg:w-[55%]">
                    <img className="w-full lg:ml-10 h-60 object-cover rounded-md" src={JoinImg} alt="" />
                </div>
            </div>
        </section>
    )
}

export default Join