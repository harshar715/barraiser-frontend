import { createContext, useState, useMemo } from 'react';

const CommonContext = createContext();

const CommonContextProvider = (props) => {
    const [initialState, setInitialState] = useState('');

    const value = useMemo(() => ({
        initialState, setInitialState
    }), [initialState]);

    return (
        <CommonContext.Provider value={value}>
            {props.children}
        </CommonContext.Provider>
    )
}

export default CommonContextProvider;

