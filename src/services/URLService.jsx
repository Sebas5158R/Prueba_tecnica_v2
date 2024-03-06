import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8090'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user');
        if (token) {
            const tokenWithoutQuotesToken = token.replace(/['"]+/g, '');
            config.headers.Authorization = `Bearer ${tokenWithoutQuotesToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;