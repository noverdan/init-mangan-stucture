import React from 'react'

function InputMenu() {
    return (
        <div className='md:flex  md:flex-col space-y-3  '>
            <div className=''>
                <label htmlFor="">Makanan Pokok</label> <br />
                <input type="text"
                    placeholder='Masukan Makanan Pokok'
                    className='p-1 text-black  rounded border-accent-200' />
            </div>

            <div>
                <label htmlFor="">Sayuran</label> <br />
                <input type="text"
                    placeholder='Masukan Sayuran'
                    className='p-1  rounded border-accent-200' />
            </div>
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

export default InputMenu
