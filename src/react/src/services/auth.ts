import axios, { AxiosRequestHeaders } from "axios";
import { RegisterUser, User } from "../app/types";

const API_URL = "http://localhost:8080";

const register = (user: RegisterUser) => {
    return axios.post(API_URL + "signup", user);
}

const login = (user: User) => {
    return axios.post(API_URL + "signin", user).then((response) => {
        console.log("login api",response);
        if (response.data.accessToken) {
            // @todo: should probably persist this in state too
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
}

const logout = () => {
    localStorage.removeItem("user");
}

const authHeader = (): AxiosRequestHeaders => {
    const localUser = localStorage.getItem("user");
    const user = localUser ? JSON.parse(localUser) : null;
    return user && user.accessToken ? { "x-access-token": user.accessToken } : {};
}
const authService = { register, login, logout, authHeader };
export default authService;