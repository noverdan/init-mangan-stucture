import React from 'react'

function InputMenuTambahan() {
    return (
        <div className='flex-col flex gap-3'>
            <div className=''>
                <label htmlFor="">Lauk</label> <br />
                <input type="text"
                    placeholder='Masukan Lauk'
                    className='p-1  rounded border-accent-200' />
            </div>

            <div>
                <label htmlFor="">Tambahan 1</label> <br />
                <input type="text"
                    placeholder='Masukan Tambahan 1'
                    className='p-1  rounded border-accent-200' />
            </div>

            <div>
                <label htmlFor="">Tambahan 1</label> <br />
                <input type="text"
                    placeholder='Masukan Tambahan 1'
                    className='p-1  rounded border-accent-200' />
            </div>

            <div>
                <label htmlFor="">Tambahan 1</label> <br />
                <input type="text"
                    placeholder='Masukan Tambahan 1'
                    className='p-1  rounded border-accent-200' />
            </div>

        </div>
    )
}

export default InputMenuTambahan
