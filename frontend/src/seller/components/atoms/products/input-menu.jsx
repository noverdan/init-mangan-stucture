import React, { useEffect } from 'react'

function InputMenu({ onChange, menuData }) {



    return (
        <div className='md:flex  md:flex-col space-y-3  '>
            <div className=''>
                <label htmlFor="">Makanan Pokok</label> <br />
                <input type="text"
                    placeholder='Masukan Makanan Pokok'
                    className='p-1 text-black  rounded border-accent-200'
                    name='makananPokok'
                    onChange={onChange}
                    value={menuData.makananPokok} />
            </div>

            <div>
                <label htmlFor="">Sayuran</label> <br />
                <input type="text"
                    placeholder='Masukan Sayuran'
                    name='sayuran'
                    className='p-1 text-black    rounded border-accent-200'
                    onChange={onChange}
                    value={menuData.sayuran} />
            </div>
            <div>
                <label htmlFor=""
                >Lauk</label> <br />
                <input type='text'
                    name='lauk'
                    placeholder='Masukan Nama Menu'
                    className='p-1 text-black rounded border-accent-200'
                    onChange={onChange}
                    value={menuData.lauk} />
            </div>

            <div>
                <label htmlFor="">tambahan 1</label> <br />
                <input type='text'
                    name='tambahan1'
                    placeholder='Masukan Harga'
                    className='p-1 text-black rounded border-accent-200'
                    onChange={onChange}
                    value={menuData.tambahan1} />
            </div>
        </div>
    )
}

export default InputMenu
