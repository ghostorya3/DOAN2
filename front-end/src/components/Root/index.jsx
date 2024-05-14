import { useMyContext } from "../context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";


export default function Root() {
    const isLogin = Cookies.get('token_classroom');
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) navigate('/Login');
    }, [isLogin, navigate])

    return <Outlet></Outlet>;
}