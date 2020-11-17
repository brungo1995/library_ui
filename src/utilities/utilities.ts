import axios from "axios";
import * as React from "react-router-dom";

const baseUrl = "http://localhost:5000/";
const JWT_TOKEN = localStorage.getItem('token');

const options = {
    headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json'
    },
};

// Api call functions

export function getBaseUrl() {
    return baseUrl;
}

export function getApiCall(url: string) {
    return axios.get(baseUrl + url, options);
}

export function postApiCall(url: string, data: any) {
    return axios.post(baseUrl + url, data, options);
}

export function deleteApiCall(url: string) {
    return axios.delete(baseUrl + url, options);
}

export function putApiCall(url: string, data: any) {
    return axios.put(baseUrl + url, data, options);
}


export function findParams(path: string, url: string): any {
    const matchingPath = React.matchPath(path, url);
    return matchingPath ? matchingPath.params : null;
}

