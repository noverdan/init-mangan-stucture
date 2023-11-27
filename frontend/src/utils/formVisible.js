import { useState } from "react";

const useToogleVisibility = (initialState = false) => {
    const [visible, setVisible] = useState(initialState);

    const toggleVisibility = () => setVisible(!visible);

    return [visible, toggleVisibility];


}

export default useToogleVisibility;