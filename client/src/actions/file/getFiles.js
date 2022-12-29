import axios from 'axios';
import { setFiles } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';

export function getFiles(dirId, sort, filter) {
    return async (dispatch) => {
        try {
            let URL = process.env.REACT_APP_API_URL + 'drive?';
            if (dirId) {
                URL += `parent=${dirId}&`;
            }
            if (sort) {
                URL += `sort=${sort}&`;
            }
            if (filter) {
                filter.forEach((value) => {
                    URL += `filter=${value}&`;
                });
            }
            //console.log(filter);
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(setFiles(response.data.data.files));
        } catch (e) {
            dispatch(setErrorDisplay(true, e.response.data.message));
        }
    };
}
