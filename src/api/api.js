import axios from "axios";

const token = localStorage.getItem("auth") || null;

const options = {
    baseURL:process.env.REACT_APP_BACKEND_SERVER,
    headers:{
        "Content-Type":"application/json"
    }
}



const instance = axios.create(options)

export default instance;