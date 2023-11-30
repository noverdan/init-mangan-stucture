import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PackagesContext = createContext()
const urlPackages = "http://localhost:3000/packages"
const urlMenus = "http://localhost:3000/menus"
const urlReviews = "http://localhost:3000/reviews"

function PackagesProvider({ children }) {
    const [packages, setPackages] = useState([])
    const [menus, setMenus] = useState([])
    const [reviews, setReviews] = useState([])
    const [errStatus, setErrStatus] = useState("")

    useEffect(() => {
        const fetchPackages = () => {
            axios.get(urlPackages)
                .then(function (res) {
                    setPackages(res.data)
                })
                .catch(function (err) {
                    const errMessage = err.message
                    setErrStatus(errMessage)
                });
        }
        const fetchMenus = () => {
            axios.get(urlMenus)
                .then(function (res) {
                    setMenus(res.data)
                })
                .catch(function (err) {
                    const errMessage = err.message
                    setErrStatus(errMessage)
                });
        }
        const fetchReviews = () => {
            axios.get(urlReviews)
                .then(function (res) {
                    setReviews(res.data)
                })
                .catch(function (err) {
                    const errMessage = err.message
                    setErrStatus(errMessage)
                });
        }

        fetchPackages()
        fetchMenus()
        fetchReviews()
    }, [])


    return (
        <PackagesContext.Provider value={{ packages, menus, reviews, errStatus }}>
            {children}
        </PackagesContext.Provider>
    )
}

export { PackagesContext, PackagesProvider }