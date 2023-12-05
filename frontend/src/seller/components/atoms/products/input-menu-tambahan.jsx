import React, { useState } from 'react';

function InputMenuTambahan() {
    const [isInput2Active, setIsInput2Active] = useState(false);

    const handleToggleInput2 = () => {
        setIsInput2Active((prevValue) => !prevValue);
    };


    const [isInput3Active, setIsInput3Active] = useState(false);

    const handleToggleInput3 = () => {
        setIsInput3Active((prevValue) => !prevValue);
    };


    return (
        <div className='flex-col flex gap-3'>
            <div>
                <label htmlFor=''>Tambahan 3</label> <br />
                <input type='text' placeholder='Masukan Tambahan 1' className='p-1 rounded border-accent-200' />
            </div>

            {isInput2Active && (
                <div >
                    <label htmlFor=''>Tambahan 4</label> <br />
                    <input type='text' placeholder='Masukan Tambahan 2' className='p-1 rounded border-accent-200' />
                </div>
            )}

            <button
                type='button'
                onClick={handleToggleInput2}
                className='bg-accent-200 p-1 mt-6 text-white rounded-md'
            >
                {isInput2Active ? 'Batalkan Tambahan 2' : 'Masukan Tambahan 2'}
            </button>

            {isInput3Active && (
                <div >
                    <label htmlFor=''>Tambahan 5</label> <br />
                    <input type='text' placeholder='Masukan Tambahan 2' className='p-1 rounded border-accent-200' />
                </div>
            )}

            <button
                type='button'
                onClick={handleToggleInput3}
                className='bg-accent-200 p-1 mt-6 text-white rounded-md'
            >
                {isInput3Active ? 'Batalkan Tambahan 3' : 'Masukan Tambahan 3'}
            </button>

        </div>
    );
}

export default InputMenuTambahan;
