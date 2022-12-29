import axios from 'axios';
import { setFiles } from '../../reducers/file';
import { showLoader } from '../../reducers/helper';
import { setErrorDisplay } from '../../reducers/modal';

export function searchFiles(search) {
    return async (dispatch) => {
        try {
            dispatch(showLoader(true));

            const query = `?search=${search}`;
            let URL = process.env.REACT_APP_API_URL + 'drive/search' + query;
            const token = localStorage.getItem('token');
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch(setFiles(response.data.data.files));
        } catch (e) {
            dispatch(setErrorDisplay(true, e.response.data.message));
        } finally {
            dispatch(showLoader(false));
        }
    };
}
