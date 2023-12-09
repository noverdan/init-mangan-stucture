import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import stars0 from '../../assets/stars0.svg'
import stars1 from '../../assets/stars1.svg'
import stars2 from '../../assets/stars2.svg'
import stars3 from '../../assets/stars3.svg'
import stars4 from '../../assets/stars4.svg'
import stars5 from '../../assets/stars5.svg'
import { DataContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

function Card({ packageId, image, title, priceRange, menuTotal, rating, sold, city }) {
    const { packageIdSelected, setPackageIdSelected } = useContext(DataContext)
    const navigate = useNavigate()

    let packageImage = image
    let packageTitle = title
    let packagePriceRange = priceRange
    let packageMenuTotal = menuTotal
    let packageRating = rating
    let packageSold = sold
    let packageCity = city
    let stars
    switch (Math.floor(packageRating)) {
        case 1:
            stars = stars1
            break;
        case 2:
            stars = stars2
            break;
        case 3:
            stars = stars3
            break;
        case 4:
            stars = stars4
            break;
        case 5:
            stars = stars5
            break;
        default:
            stars = stars0
            break;
    }

    function cardClick(id) {
        setPackageIdSelected(id)
        navigate(`/catering/${id}`)
        window.scrollTo(0, 0);
    }

    return (
        <div onClick={() => cardClick(packageId)} className='p-2 bg-white rounded border-[1.5px] border-primary-100 w-full group cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 active:translate-y-0'>
            <div className='rounded overflow-hidden'>
                <div className='rounded aspect-square bg-gray-200 bg-cover group-hover:bg-scale-150 group-hover:scale-105 transition-all duration-300' style={{ backgroundImage: `url(${packageImage})` }}></div>
            </div>
            <div className='mt-2'>
                <p className='h-[34px] line-clamp-2 font-semibold break-keep text-primary-100 leading-none overflow-hidden text-ellipsis whitespace-pre-wrap'>{packageTitle}</p>
                <p className='font-bold text-sm text-accent-200 mt-1'>{packagePriceRange}</p>
                <p className='text-accent-200 text-xs font-semibold mt-1'>{packageMenuTotal} Menu</p>
                <div className='flex items-center'>
                    <img className='mt-1' src={stars} alt="" />
                    <p className='font-medium text-accent-200 ml-1'>{packageRating}</p>
                </div>
                <div className='flex justify-between mt-1'>
                    <p className='text-accent-200 text-xs font-medium'>{packageSold} Terjual</p>
                    <div className='flex items-center'>
                        <p className='text-accent-200 text-xs font-medium'>{packageCity}</p>
                        <Icon icon="mdi:location" className='text-accent-200' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card