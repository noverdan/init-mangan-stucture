import React, { createContext, useState } from 'react';

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [isSearch, setSearch] = useState(false)
    const [searchParam, setSearchParam] = useState(null)

    return (
        <SearchContext.Provider value={{ isSearch, setSearch, searchParam, setSearchParam }}>
            {children}
        </SearchContext.Provider>
    )
}
export { SearchContext, SearchProvider }