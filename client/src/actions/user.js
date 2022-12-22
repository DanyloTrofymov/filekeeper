import axios from 'axios';

export const registration = async (
    email,
    username,
    password,
    repeatPassword,
) => {
    try {
        const req = {
            email: email,
            username: username,
            password: password,
            confirmPassword: repeatPassword,
        };
        const URL = process.env.REACT_APP_API_URL + 'auth/registration';
        //alert(req)
        const response = await axios.post(URL, req);
        alert(JSON.stringify(response.data));
    } catch (e) {
        alert(e.response.data.message);
    }
};

export const login = async (username, password) => {
    try {
        const req = {
            username: username,
            password: password,
        };
        const URL = process.env.REACT_APP_API_URL + 'auth/login';
        //alert(req)
        const response = await axios.post(URL, req);
        alert(JSON.stringify(response.data));
    } catch (e) {
        alert(e.response.data.message);
    }
};
