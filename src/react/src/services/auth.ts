import axios, { AxiosRequestHeaders } from "axios";

const API_URL = "http://localhost:8080";

export interface User {
    username: string,
    password: string,
}
export interface RegisterUser extends User {
    email: string,
}

const register = (user: RegisterUser) => {
    return axios.post(API_URL + "signup", user);
}

const login = (user: User) => {
    return axios.post(API_URL + "signin", user).then((response) => {
        if (response.data.accessToken) {
            // @todo: should probably persist this in state too
            localStorage.setItem("user", JSON.stringify(response.data));
        }
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