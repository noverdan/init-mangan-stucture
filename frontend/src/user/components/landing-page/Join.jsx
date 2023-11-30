import LocalButton from "../Button"
import JoinImg from "../../../assets/join-us.jpg"

function Join() {
    return (
        <section className="px-20 py-10">
            <header className='font-semibold text-xl text-center text-primary-100'>Join With Us</header>
            <div className="flex items-center gap-10 mt-7">
                <div className="w-[45%]">
                    <p className="font-bold">Anda punya usaha usaha katering tapi jangkauan pelanggannya masih kecil?</p>
                    <p className="mt-1">Bergabung dengan kami dan temukan pelanggan anda secara lebih luas.</p>
                    <div className="mt-5">
                        <LocalButton name='Bergabung Sekarang' />
                    </div>
                </div>
                <div className="w-[55%]">
                    <img className="w-full ml-10 h-60 object-cover rounded-md" src={JoinImg} alt="" />
                </div>
            </div>
        </section>
    )
}

export default Join