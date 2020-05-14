import config from '../config.json';
import { authHeader } from '../helpers/auth-header';

import axios from "axios";


const login = async (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(`${config.apiUrl}/users/authenticate`, requestOptions);
    const user = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


const register = async (user) => {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = await fetch(`${config.apiUrl}/users/register`, requestOptions);
    return handleResponse(response);
}


const getAllJob  = async (data) => {
    
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(user)
    // };
    

    const response = await axios.get("https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?search=node");
    return handleResponse(response);
}


const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const userService = {
    login,
    logout,
    register,
    getAllJob
};