import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataContext = createContext()

function ContextProvider({ children }) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [packageIdSelected, setPackageIdSelected] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [loadData, setLoadData] = useState(true)
    const [authorization, setAuthorization] = useState("")
    const [dataPackages, setDataPackages] = useState({})

    useEffect(() => {
        setLoadData(true)
        fetchPackages()
            .then((res) => {
                setDataPackages(res.data.package)
                console.log(res.data.message);
            })
            .then(() => {
                setLoadData(false)
            })
            .catch((err) => {
                console.log(err);
                setLoadData(false)
            })
    }, [])
    useEffect(() => {
        setAuthorization(localStorage.getItem("authorization"))
    }, [isLoggedIn])

    return (
        <DataContext.Provider value={{
            isModalOpen, setModalOpen,
            packageIdSelected, setPackageIdSelected,
            isLoggedIn, setIsLoggedIn,
            loadData, setLoadData,
            authorization,
            dataPackages, setDataPackages
        }}>
            {children}
        </DataContext.Provider>
    )
}
export { ContextProvider, DataContext }

function fetchPackages() {
    const config = {
        method: "GET",
        url: "http://localhost:3000/packages"
    }
    return axios.request(config)
}