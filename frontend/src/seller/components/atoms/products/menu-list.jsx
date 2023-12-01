import React from 'react'

function MenuList() {
    return (
        <div className='flex gap-2 bg-accent-200 rounded-[10px] text-white p-3  mb-6'>
            <img src="" alt="" className='w-12 rounded-[10px] bg-white' />
            <div className='flex flex-col p-4'>
                <h1 className='font-semibold'>Nama Menu</h1>
                <table>
                    <tr>
                        <th>Header Kolom 1</th>
                        <th>Header Kolom 2</th>
                    </tr>
                    <tr>
                        <td>Data Baris 1</td>
                        <td>Data Baris 1</td>
                    </tr>
                    <tr>
                        <td>Data Baris 2</td>
                        <td>Data Baris 2</td>
                    </tr>
                </table>

            </div>
        </div>
    )
}

export default MenuList
