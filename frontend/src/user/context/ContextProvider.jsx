import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataContext = createContext()

function ContextProvider({ children }) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [packageIdSelected, setPackageIdSelected] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loadData, setLoadData] = useState(true)
    const userData = localStorage.getItem("token")

    useEffect(() => {
        if (userData) {
            simulateAuth()
        }
        setLoadData(false)
    }, [userData])

    function simulateAuth() {
        setIsLoggedIn(true)
        const data = JSON.parse(userData)
        const urlUser = import.meta.env.VITE_URL_USER
        axios.get(`${urlUser}/${data.id}`)
            .then((res) => {
                if (res.data) {
                    setIsLoggedIn(true)
                    setLoadData(false)
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoggedIn(false)
                setLoadData(false)
            })
    }

    return (
        <DataContext.Provider value={{
            isModalOpen, setModalOpen,
            packageIdSelected, setPackageIdSelected,
            isLoggedIn, setIsLoggedIn,
            loadData, setLoadData
        }}>
            {children}
        </DataContext.Provider>
    )
}
export { ContextProvider, DataContext }