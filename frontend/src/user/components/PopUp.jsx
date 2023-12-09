import { Modal, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Icon } from '@iconify/react';

function PopUpAlert({ isOpen, message, onClose, onProcess }) {
    const [openAlert, setOpenAlert] = useState(false)
    useEffect(() => {
        setOpenAlert(isOpen)
    }, [isOpen])

    return (
        <>
            <Modal show={openAlert} size="sm" onClose={onClose} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20 text-yellow-300" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                            {message}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button className='bg-yellow-300 text-white px-4 py-2 rounded-md hover:bg-opacity-75 active:bg-opacity-100'
                                onClick={onProcess}>
                                {"OK"}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
function PopUpSucces({ isOpen, message, onClose, onProcess }) {
    const [openSucces, setOpenSucces] = useState(false)
    useEffect(() => {
        setOpenSucces(isOpen)
    }, [isOpen])
    return (
        <>
            <Modal show={openSucces} size="sm" onClose={onClose} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <Icon icon="icon-park-outline:success" className="text-green-700 mx-auto mb-2" width={80} />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {message}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button className='bg-green-700 text-white px-4 py-2 rounded-md hover:bg-opacity-75 active:bg-opacity-100' onClick={onProcess}>
                                {"OK"}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
function PopUpQuestion({ isOpen, message, onClose, onProcess, onCancel }) {
    const [openSucces, setOpenSucces] = useState(false)
    useEffect(() => {
        setOpenSucces(isOpen)
    }, [isOpen])
    return (
        <>
            <Modal show={openSucces} size="sm" onClose={onClose} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <Icon icon="octicon:question-16" className="text-primary-100 mx-auto mb-2" width={80} />
                        <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {message}
                        </div>
                        <div className="flex justify-center gap-4">
                            <button className='bg-white text-gray-500 font-semibold border-[1.5px] border-gray-300 px-4 py-2 rounded-md hover:bg-opacity-75 active:bg-opacity-100'
                                onClick={onCancel}>
                                {"Cancel"}
                            </button>
                            <button className='bg-primary-100 font-medium text-white px-7 py-2 rounded-md hover:bg-opacity-75 active:bg-opacity-100'
                                onClick={onProcess}>
                                {"OK"}
                            </button>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export { PopUpSucces, PopUpAlert, PopUpQuestion }