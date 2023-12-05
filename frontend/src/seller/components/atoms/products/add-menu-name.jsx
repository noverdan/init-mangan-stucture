import React from 'react'

function AddMenuName({ onChange, menuData }) {


    return (
        <div className='md:flex space-y-3 md:space-y-0  md:-mt-2 md:gap-4'>
            <div className=''>
                <label htmlFor="">Nama Menu</label> <br />
                <input type="text"
                    placeholder='Masukan Makanan Pokok'
                    className='p-1 text-black  rounded border-accent-200'
                    name='nameMenu'
                    onChange={onChange}
                    value={menuData.nameMenu} />
            </div>


            <div>
                <label htmlFor="">Harga</label> <br />
                <input type="number"
                    placeholder='Masukan Harga'
                    name='price'
                    onChange={onChange}
                    value={menuData.price}
                    className='p-1 text-black   rounded border-accent-200' />
            </div>
        </div>
    )
}

export default AddMenuName
