import axios from 'axios';
import { setErrorDisplay } from '../../reducers/modal';
import { fileDelete } from '../../reducers/file';

export function deleteFile(file) {
    return async (dispatch) => {
        try {
            const URL = process.env.REACT_APP_API_URL + `drive?id=${file._id}`;
            const token = localStorage.getItem('token');
            await axios.delete(URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(fileDelete(file._id));
        } catch (e) {
            if (e.response)
                dispatch(setErrorDisplay(true, e.response.data.message));
            else dispatch(setErrorDisplay(true, e));
        }
    };
}
