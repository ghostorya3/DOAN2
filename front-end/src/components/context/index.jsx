import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";

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
        const user = getInfoUser();
        if (user) {
            setUser(user)
            socketIO.emit('login', { id: user._id });
        }
        // toast("Welcome to Classroom!");
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
        const token = Cookies.get('token_classroom');
        const response = jwtDecode(token);
        if (response) return response.data;
        return null
    } catch (error) {
        return null
    }
}