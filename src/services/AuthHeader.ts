export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token && token) {
        return {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}