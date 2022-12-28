import axios from 'axios';
import { setUser } from '../../reducers/user';

export const auth = () => {
    return async (dispatch) => {
        try {
            const URL = process.env.REACT_APP_API_URL + 'auth/token/';
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setUser(response.data.user));
                localStorage.setItem('token', response.data.data.token);
            }
        } catch (e) {
            console.log(e.response.data.message);
            localStorage.removeItem('token');
        }
    };
};
