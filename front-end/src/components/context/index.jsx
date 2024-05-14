import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
// import JWT from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';

const MyContext = createContext(undefined);

export const MyContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [socket, SetSocket] = useState();
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
        const socketIO = io('http://localhost:8080');
        if (socketIO) SetSocket(socketIO);
        // const user = getInfoUser();
        socketIO.emit('login', { id: 20 });
        toast("Wow so easy!");

    }, [isLoggedIn]);


    return (
        <MyContext.Provider value={{ isLoggedIn, login, logout, setUserData, user, socket }}>
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

const getInfoUser = () => {
    try {
        const token = Cookies.get('token');
        const response = JWT.decode(token);
        if (response) return response;
        return null
    } catch (error) {
        return null
    }
}