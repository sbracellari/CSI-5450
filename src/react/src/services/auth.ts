import axios, { AxiosRequestHeaders } from "axios";
import { LoginUser, User } from "../app/types";
import { Redirect } from "react-router-dom";

const API_URL = "http://localhost:8080/v1";

const register = (user: User) => {
    const userInfo = JSON.stringify({
        email: user.email,
        fName: user.fname,
        lName: user.lname,
        password: user.password
    });

    return axios.post(API_URL + "/user/register", userInfo, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'   
        }}).then((response) => {
        if (response.data.token !== null) {
            localStorage.setItem("token", response.data.token);
            return response.data;
        }
    });
}

const login = (user: LoginUser) => {
    return axios.get(`${API_URL}/user/${user.email}/login`).then((response) => {
        if (user.password === response.data.password) {
            localStorage.setItem("token", response.data.token);
            return response.data;
        }
    });
}

// const logout = () => {
//     return Promise.resolve().then(() => {
//         console.log("HELLLOOOO")
//         localStorage.removeItem("token");
//     });
// }

const authHeader = (): AxiosRequestHeaders => {
    const localUser = localStorage.getItem("token");
    const user = localUser ? JSON.parse(localUser) : null;
    return user && user.accessToken ? { "x-access-token": user.accessToken } : {};
}
const authService = { register, login, authHeader };
export default authService;