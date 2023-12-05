import { useEffect, useState } from "react"
import { MutatingDots } from 'react-loader-spinner'


export default function Loader({ show }) {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(show)
    }, [show])

    return (
        <>
            <MutatingDots
                height="100"
                width="100"
                color="#de283b"
                secondaryColor='#de283b'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass="h-screen w-full flex justify-center items-center fixed top-0  bg-white z-50"
                visible={isLoading}
            />
        </>
    )
}