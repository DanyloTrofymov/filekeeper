import axios from 'axios';
import { setUser } from '../../reducers/user';
import { setErrorDisplay } from '../../reducers/modal';

export const registration = (email, username, password, repeatPassword) => {
    return async (dispatch) => {
        alert('123');
        try {
            const req = {
                email: email,
                username: username,
                password: password,
                confirmPassword: repeatPassword,
            };
            const URL = process.env.REACT_APP_API_URL + 'auth/registration/';
            const response = await axios.post(URL, req);
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.data.token);
        } catch (e) {
            dispatch(setErrorDisplay(true, e.response.data.message));
        }
    };
};
