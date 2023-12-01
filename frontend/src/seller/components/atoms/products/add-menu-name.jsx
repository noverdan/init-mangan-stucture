import React from 'react'

function AddMenuName() {
    return (
        <div className='md:flex space-y-3 md:space-y-0  md:-mt-2 md:gap-4'>
            <div>
                <label htmlFor=""
                >Nama Menu</label> <br />
                <input type="text"
                    placeholder='Masukan Nama Menu'
                    className='p-1 text-black  rounded border-accent-200' />
            </div>

            <div>
                <label htmlFor="">Harga</label> <br />
                <input type="number"
                    placeholder='Masukan Harga'
                    className='p-1 text-black   rounded border-accent-200' />
            </div>
        </div>
    )
}

export default AddMenuName
