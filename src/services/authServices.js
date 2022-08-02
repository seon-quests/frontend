import axios from "axios";
import jwtDecode from "jwt-decode";
import {authorizedRequest, unauthorizedRequest} from "./request";
const apiUrl = process.env.REACT_APP_API_URL;

export function login(data) {
    let formdata = new FormData();
    formdata.append('username', data.username)
    formdata.append('password', data.password)
    return axios.post(
        `${apiUrl}/token`, formdata, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
}

function customerHomePagePath(customerPermission){
    console.log(customerPermission)
    if (customerPermission==='admin'){
        return '/admin/index';
    }
    else if(customerPermission==='player'){
        return '/player/index';
    }
    return '/sorry';
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem("access_token");
        let currentUser = jwtDecode(token);
        currentUser = {...currentUser, 'homePage': customerHomePagePath(currentUser.permissions)}
        console.log(currentUser)
        return currentUser;
    } catch (error) {
        return null;
    }
}

export const getCurrentUserInfo = async () => {
    try {
        return await authorizedRequest.get(`${apiUrl}/v1/users/me`);
    } catch (e) {
        return {"first_name": null, "last_name": null};
    }
};

export function logout() {
    localStorage.removeItem("access_token");
    window.location = '/auth/login';
}

export function registerPlayer(data){
    return unauthorizedRequest.post(`${apiUrl}/signup`, data);
}

export function getRedirectPath() {
    const redirectPath = '/auth/login';
    try {
        const user = getCurrentUser();
        if (user && user.permissions){
            return user.permissions === 'admin' ? '/admin/index/' : '/player/test';
        }
        return redirectPath
    } catch (e) {
        alert('Сталась якась помилка')
        return redirectPath
    }
}