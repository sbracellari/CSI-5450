
import axios from "axios";
import { Artwork } from "../app/types";
import auth from "./auth";
//@todo: export API in a config
const API_URL = "http://localhost:8080/v1/";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": API_URL,
    
    },
});

const getAdmin = () => axios.get(API_URL + "admin", { headers: auth.authHeader() });
const getUser = () => axios.get(API_URL + "user", { headers: auth.authHeader() });
const fetchCollection = async () => {
    try {
        const response = await apiClient.get("/collection");
        console.log(response);
    } catch (e) {
        console.log(e);
    }
}

export { getAdmin, getUser, fetchCollection };