import axios from 'axios';
import { setUser } from '../../reducers/user';

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const req = {
                username: username,
                password: password,
            };
            const URL = process.env.REACT_APP_API_URL + 'auth/login/';
            const response = await axios.post(URL, req);
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.data.token);
        } catch (e) {
            alert(e.response.data.message);
        }
    };
};


