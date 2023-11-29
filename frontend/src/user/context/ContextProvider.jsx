import React, { createContext, useState } from 'react';

const DataContext = createContext()

function ContextProvider({ children }) {
    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <DataContext.Provider value={{ isModalOpen, setModalOpen }}>
            {children}
        </DataContext.Provider>
    )
}
export { ContextProvider, DataContext }