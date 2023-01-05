import axios from 'axios';
import { setUser } from '../../reducers/user';
import { setErrorDisplay } from '../../reducers/modal';

export const registration = (email, username, password, repeatPassword) => {
    return async (dispatch) => {
        try {
            const req = {
                email: email,
                username: username,
                password: password,
                confirmPassword: repeatPassword,
            };
            const URL = process.env.REACT_APP_API_URL + 'auth/registration/';
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
