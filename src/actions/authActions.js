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
        return axios.post(`${process.env.REACT_APP_API_URL}/signin`, data)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
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
        return axios.post(`${process.env.REACT_APP_API_URL}/signup`, data)
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
