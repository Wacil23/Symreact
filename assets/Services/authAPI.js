import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
    window.localStorage.removeItem('AuthToken');
    delete axios.defaults.headers['Authorization'];
}

function setAxiosToken(token) {
    axios.defaults.headers['Authorization'] = "Bearer " + token;
}

function authenticate(credentials) {
    return axios
        .post("https://localhost:8000/api/login_check", credentials)
        .then((response) => response.data.token)
        .then(token => {
            window.localStorage.setItem('AuthToken', token);
            setAxiosToken(token)
        })
}

function setup() {
    const token = window.localStorage.getItem("AuthToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
        }
    }
}

function isAuth() {
    const token = window.localStorage.getItem("AuthToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuth,
};