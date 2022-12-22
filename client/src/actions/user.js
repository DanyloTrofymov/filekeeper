import axios from 'axios';
import {setUser} from "../reducers/user";

export const registration = async (
    email,
    username,
    password,
    repeatPassword,
) => {
    return async dispatch => {
    try {
        const req = {
            email: email,
            username: username,
            password: password,
            confirmPassword: repeatPassword,
        };
        const URL = process.env.REACT_APP_API_URL + 'auth/registration';
        const response = await axios.post(URL, req);
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.data.token)
    } catch (e) {
        alert(e.response.data.message);
    }
}
};

export const login = (username, password) => {
    return async dispatch => {
        try {
            const req = {
                username: username,
                password: password,
            };
            const URL = process.env.REACT_APP_API_URL + 'auth/login';
            const response = await axios.post(URL, req);
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.data.token)
        } catch (e) {
            alert(e.response.data.message);
    }
}
};

export const auth = () => {
    return async dispatch => {
        try {
            const URL = process.env.REACT_APP_API_URL + 'auth/token';
            const token = localStorage.getItem('token');
            if(token){
                const response = await axios.get(URL, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.data.token)
            }
        } catch (e) {
            alert(e.response.data.message);
            localStorage.removeItem('token')
    }
}
};
