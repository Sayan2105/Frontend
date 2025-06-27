import axios from "axios";


const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 10000, // if doesnt get res
    withCredentials : true
})


export default AxiosClient