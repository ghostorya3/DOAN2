import React, { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext(undefined);

export const MyContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null)
    };

    const setUserData = (data) => {
        setUser(data);
    };

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn]);


    return (
        <MyContext.Provider value={{ isLoggedIn, login, logout, setUserData, user }}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
};