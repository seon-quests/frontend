import axios, { Canceler, AxiosResponse } from "axios";
import qs from "qs";
import {logout} from "./authServices";


let cancel;
const paramsSerializer = (params) => qs.stringify(params);
const apiUrl = process.env.REACT_APP_API_URL;

const authorizedRequest = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json"
    },
    cancelToken: new axios.CancelToken((c) => {
        if (cancel) cancel();
        cancel = c;
    })
});

const unauthorizedRequest = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

authorizedRequest.interceptors.request.use(
    (axiosConfig) => {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            axiosConfig.headers.common.Authorization = `Bearer ${accessToken}`;
        }

        axiosConfig.paramsSerializer = (params) => paramsSerializer(params);

        return axiosConfig;
    },
    (error) => Promise.reject(error)
);

authorizedRequest.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ){
            alert('Термін дії вашого логіну вичерпано. Будь ласка, зайдіть в систему ще раз.')
            return logout()
        }
        if (error.response && error.response.status >= 400 ) {
            alert(JSON.stringify(Object.values(error.response.data).flat()));
            return Promise.reject(error);
        }
        console.log(error);
        return Promise.reject(error);
    }
);

export { authorizedRequest, unauthorizedRequest };
