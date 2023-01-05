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
            const URL = process.env.REACT_APP_API_URL + 'api/v1/auth/login/';
            const response = await axios.post(URL, req);
            localStorage.setItem('token', response.data.data.token);
            dispatch(setUser(response.data.data));
        } catch (e) {
            if (e.response)
                dispatch(setErrorDisplay(true, e.response.data.message));
            else dispatch(setErrorDisplay(true, e));
        }
    };
};
