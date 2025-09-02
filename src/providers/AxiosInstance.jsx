import axios from "axios";
import { getAccessToken } from "./AccessToken";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosApi = axios.create({
    baseURL: BASE_URL,
});

export const axiosWithCredentials = axios.create({
    baseURL: BASE_URL,
});

export const setAuthToken = (token) => {
    if (token) {
        axiosWithCredentials.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Auth token set for axiosWithCredentials:', token);
    } else {
        delete axiosWithCredentials.defaults.headers.common['Authorization'];
        console.log('Auth token removed from axiosWithCredentials');
    }
};

axiosWithCredentials.interceptors.request.use(
    (config) => {
        // console.log('Axios interceptor - Request URL:', config.url);
        // console.log('Axios interceptor - Current headers:', config.headers);
        return config;
    },
    (error) => {
        // console.error('Axios interceptor error:', error);
        return Promise.reject(error);
    }
);