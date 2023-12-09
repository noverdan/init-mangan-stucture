import { Icon } from "@iconify/react";
import Rp from "../../utils/Rupiah";

export default function Card2({ onClick, image, packageName, menuName, sellerName, menuPrice, totalPrice, orderDate, qty }) {
    return (
        <>
            <div onClick={onClick}
                className=" bg-white border border-gray-200 shadow p-2 rounded transition-all cursor-pointer hover:-translate-y-1 active:translate-y-0 select-none">
                <div className="flex gap-2">
                    <div className="w-28 h-28 aspect-square rounded bg-cover bg-center bg-slate-300 relative" style={{ backgroundImage: `url(${image})` }}>
                        <p className='bg-white shadow w-fit max-w-[100px] px-2 py-1 rounded text-[8px] select-none absolute right-1 top-1 overflow-hidden text-ellipsis whitespace-nowrap'>{menuName}</p>
                    </div>
                    <div>
                        <h1 className='max-h-10 text-primary-100 leading-5 font-medium overflow-hidden text-ellipsis whitespace-pre-wrap line-clamp-2 cursor-default'>{packageName}</h1>
                        <div className='flex items-center gap-1 text-sm font-medium text-accent-200 mt-1'>
                            <Icon icon="entypo:shop" width={14} />
                            <h4 id='seller' >{sellerName}</h4>
                        </div>
                        <h3 className='text-accent-200 text-sm'>{menuName}</h3>
                        <h1 className='text-accent-200 font-semibold flex items-center gap-5'>{Rp(menuPrice)} <span className="italic text-sm font-medium">{qty} Porsi</span></h1>
                    </div>
                </div>
                <hr className="mt-2 mb-1" />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <h1 className="text-accent-200 text-sm">Total Pembayaran :</h1>
                        <h1 className="text-accent-200 font-medium">{Rp(totalPrice)}</h1>
                    </div>
                    <div>
                        <h1 className="text-accent-200 text-sm">Tanggal Pesan :</h1>
                        <h1 className="text-accent-200 text-sm font-medium">{orderDate}</h1>
                    </div>

                </div>
            </div>
        </>
    )
}