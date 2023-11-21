function Button(props) {

    return (
        <>
            <button
                className='px-4 py-1 bg-primary-100 rounded text-white font-medium hover:bg-opacity-75 active:bg-primary-100'
            >{props.name}</button>
        </>
    )
}
export default Button