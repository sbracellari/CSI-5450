
import axios from "axios";
import auth from "./auth";
import { data } from "./collectionApi";

const API_URL = "http://localhost:8080/";

const getAdmin = () => axios.get(API_URL + "admin", { headers: auth.authHeader() });
const getUser =() => axios.get(API_URL + "user", { headers: auth.authHeader() });

function fetchCollection() {
    return new Promise<{ data: any }>((resolve) =>
        setTimeout(() => resolve({ data }), 500)
    );
}
export { getAdmin, getUser, fetchCollection };