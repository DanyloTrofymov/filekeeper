import axios from 'axios';
import { setData } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';

export function getFile(fileId) {
    return async (dispatch) => {
        try {
            const URL = `${process.env.REACT_APP_API_URL}drive/download?id=${fileId}`;
            const token = localStorage.getItem('token');
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });
            if (response.status === 200) {
                dispatch(setData(response.data));
            }
        } catch (e) {
            dispatch(setErrorDisplay(true, e.response.data.message));
        }
    };
}
