export default function authHeader() {
    const token = localStorage.getItem('token');

    if (token && token) {
        return {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}