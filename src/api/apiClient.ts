import axios from "axios";


const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 10000, // if doesnt get res
})


AxiosClient.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token')!) // it was needed to parse

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
}, (error) => {
    return Promise.reject(error);
})


// response inteceptor
AxiosClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
)



export default AxiosClient