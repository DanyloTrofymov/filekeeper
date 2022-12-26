import axios from 'axios';
import { setFiles } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';

export function getFiles(dirId) {
    return async (dispatch) => {
        try {
            const params = dirId ? `?id=${dirId}` : '';
            const URL = process.env.REACT_APP_API_URL + 'drive' + params;
            const token = localStorage.getItem('token');
            const response = await axios.delete(URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(setFiles(response.data.data.files));
        } catch (e) {
            dispatch(setErrorDisplay('flex', e.response.data.message));
        }
    };
}
