import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Token del url base", token);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;