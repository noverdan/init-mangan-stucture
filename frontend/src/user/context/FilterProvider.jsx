import React, { createContext, useState } from 'react';

const FilterContext = createContext()

const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        kota: "",
        kategori: ""
    })

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    )
}
export { FilterProvider, FilterContext }