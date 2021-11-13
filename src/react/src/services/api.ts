
import axios, { AxiosResponse } from "axios";
import { Artwork } from "../app/types";
import auth from "./auth";
import { data } from "./collectionApi";
//@todo: export API in a config
const API_URL = "http://localhost:8080/v1/";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
    },
});

const getAdmin = () => axios.get(API_URL + "admin", { headers: auth.authHeader() });
const getUser = () => axios.get(API_URL + "user", { headers: auth.authHeader() });
// const fetchCollection = async () => {
//     try {
//         const response: AxiosResponse<Artwork[]> = await apiClient.get<Artwork[]>("collection");
//         console.log(response);
//         return response.data;
//     } catch (e) {
//         console.log(e);
//     }
// }
const fetchCollection = () =>  data;
export { getAdmin, getUser, fetchCollection };