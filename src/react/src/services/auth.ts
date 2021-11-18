import axios, { AxiosRequestHeaders } from "axios";
import { LoginUser, RegisterUser, UpdateUser } from "../app/types";

const API_URL = "http://localhost:8080/v1";

const register = (user: RegisterUser) => {
    const userInfo = JSON.stringify({
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        password: user.password
    });

    return axios.post(API_URL + "/user/register", userInfo, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'   
        }}).then((response) => {
        if (response.data.token !== null) {
            localStorage.setItem('token', response.data.token);
            const usr = {
                email: response.data.email,
                fname: response.data.fname,
                lname: response.data.lname,
                password: response.data.password,
                token: response.data.token
            }
            localStorage.setItem('user', JSON.stringify(usr));
            return response.data;
        } else {
            throw 'Email already exists.';
        }
    });
}

const login = (user: LoginUser) => {
    return axios.get(`${API_URL}/user/${user.email}/login`).then((response) => {
        if (user.password === response.data.password) {
            localStorage.setItem('token', response.data.token);
            const usr = {
                email: response.data.email,
                fname: response.data.fname,
                lname: response.data.lname,
                password: response.data.password,
                token: response.data.token
            }
            localStorage.setItem('user', JSON.stringify(usr));
            return response.data;
        } else {
            throw 'Incorrect email or password.';
        }
    });
}

const logout = () => {
    return Promise.resolve().then((response) => {
        localStorage.removeItem('token');
        return response;
    })
}

const updateUser = (user: UpdateUser) => {
    const userInfo = JSON.stringify({
        fname: user.fname,
        lname: user.lname,
        password: user.password
    });

    return axios.post(API_URL + "/user/update", userInfo, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authHeader().token   
        }}).then((response) => {
            const usr = {
                email: response.data.email,
                fname: response.data.fname,
                lname: response.data.lname,
                password: response.data.password,
                token: localStorage.getItem('token')
            }
            localStorage.setItem('user', JSON.stringify(usr));
            return response.data;
    });
}

const authHeader = (): AxiosRequestHeaders => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem('user');
    return user && token ? { "token" : token } : {};  
}

const authService = { register, login, authHeader, logout, updateUser };
export default authService;