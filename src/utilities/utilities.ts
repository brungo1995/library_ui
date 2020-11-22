import axios from "axios";
import * as React from "react-router-dom";
import AuthHeader from "../services/AuthHeader"

const baseUrl = "http://localhost:5005/";
const JWT_TOKEN = localStorage.getItem('token');

const options = {
    // headers: AuthHeader(),
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    },
};

export function getBaseUrl() {
    return baseUrl;
}

// export function getApiCall(url: string) {
//     debugger
//     return axios.get(baseUrl + url, options);
// }
export function getApiCall(url: string) {
    return axios.get(baseUrl + url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    });
}

export function postApiCall(url: string, data: any) {
    return axios.post(baseUrl + url, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    });
}

export function deleteApiCall(url: string) {
    return axios.delete(baseUrl + url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    });
}

export function putApiCall(url: string, data: any) {
    return axios.put(baseUrl + url, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    });
}
