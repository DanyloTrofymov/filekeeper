import axios from 'axios';
import { setUser } from '../../reducers/user';
import { setErrorDisplay } from '../../reducers/modal';

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const req = {
                username: username,
                password: password,
            };
            const URL = process.env.REACT_APP_API_URL + 'auth/login/';
            const response = await axios.post(URL, req);
            localStorage.setItem('token', response.data.data.token);
            dispatch(setUser(response.data.data));
        } catch (e) {
            dispatch(setErrorDisplay(true, e.response.data.message));
        }
    };
};
