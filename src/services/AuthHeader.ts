export default async function authHeader() {
    debugger
    const token = localStorage.getItem('token');
    debugger
    if (token && token) {
        return {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}