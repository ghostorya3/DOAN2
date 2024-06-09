import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode'
import { toast } from "react-toastify";

export const POST = async (url, conditions = {}) => {
    try {
        let headers = { "Content-Type": "application/json" };
        const getTokeFromBrowser = Cookies.get('token_classroom');
        if (getTokeFromBrowser) {
            headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getTokeFromBrowser}`,
            };
        }
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_URL_API}/api${url}`,
            data: conditions,
            headers,
        });
        return response.data
    } catch (error) {
        toast(error.message)
    }
}

export const handleEroor = (error) => {
    return error.response?.data?.message ? alert(error.response?.data?.message) : alert('Có lỗi xảy ra')
}

export const getInfoFromToken = () => {
    try {
        const token = Cookies.get('token_classroom');
        if (token) {
            const response = jwtDecode(token);

            if (typeof response === 'object' && response !== null) {
                const tokenInfo = response;
                return tokenInfo;
            } else {
                return null
            }
        }
        return null
    } catch (error) {
        return null
    }
}

export const GET = async (url, conditions) => {
    let headers = { "Content-Type": "application/json" };
    const getTokeFromBrowser = Cookies.get('token_classroom');
    if (getTokeFromBrowser) {
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokeFromBrowser}`,
        };
    }
    const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_URL_API}${url}`,
        data: conditions,
        headers,
    });
    return response
}

export const POST_JSON = async (url, conditions) => {
    let headers = { "Content-Type": "application/json" };
    const getTokeFromBrowser = Cookies.get('token_classroom');
    if (getTokeFromBrowser) {
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokeFromBrowser}`,
        };
    }
    const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_URL_API}${url}`,
        data: conditions,
        headers,
    });
    return response
}
