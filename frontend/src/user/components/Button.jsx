function Button(props) {
    function buttonType() {
        switch (props.tipe) {
            case 'primary':
                return 'bg-primary-100'
            case 'secondary':
                return 'bg-primary-200'
            default:
                return 'bg-primary-100'
        }
    }
    return (
        <>
            <button
                className={buttonType() + 'px-4 py-1 rounded text-white font-normal hover:bg-opacity-75 active:bg-primary-100'}
            >{props.name}</button>
        </>
    )
}
export default Button