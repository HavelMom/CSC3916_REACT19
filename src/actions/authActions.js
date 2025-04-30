import axios from 'axios';
import actionTypes from '../constants/actionTypes';

function userLoggedIn(username) {
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function logout() {
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function submitLogin(data) {
    return dispatch => {
        return axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, data)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                // set axios default header for all future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('username', data.username);
                dispatch(userLoggedIn(data.username));
                return response;
            })
            .catch((error) => {
                throw(error);
            });
    }
}

export function submitRegister(data) {
    return dispatch => {
        return axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw(error);
            });
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        dispatch(logout());
    }
}
