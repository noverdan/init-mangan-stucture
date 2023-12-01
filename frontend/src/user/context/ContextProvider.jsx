import React, { createContext, useState } from 'react';

const DataContext = createContext()

function ContextProvider({ children }) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [packageIdSelected, setPackageIdSelected] = useState()

    return (
        <DataContext.Provider value={{
            isModalOpen, setModalOpen,
            packageIdSelected, setPackageIdSelected
        }}>
            {children}
        </DataContext.Provider>
    )
}
export { ContextProvider, DataContext }