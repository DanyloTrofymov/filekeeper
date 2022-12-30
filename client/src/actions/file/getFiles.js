import axios from 'axios';
import { setFiles } from '../../reducers/file';
import { showLoader } from '../../reducers/helper';
import { setErrorDisplay } from '../../reducers/modal';

export function getFiles(dir, sort, filter) {
    return async (dispatch) => {
        try {
            dispatch(showLoader(true));
            let URL = process.env.REACT_APP_API_URL + 'drive?';
            if (dir) {
                URL += `parent=${dir._id}&`;
            }
            if (sort) {
                URL += `sort=${sort}&`;
            }
            if (filter) {
                filter.forEach((value) => {
                    URL += `filter=${value}&`;
                });
            }
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
