import axios from 'axios';
import { setFiles } from '../../reducers/file';
import { setLoader } from '../../reducers/helper';
import { setErrorDisplay } from '../../reducers/modal';

export function getFiles(dir, sort, filter) {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true));
            let URL = process.env.REACT_APP_API_URL + 'api/v1/drive?';
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
            if (e.response)
                dispatch(setErrorDisplay(true, e.response.data.message));
            else dispatch(setErrorDisplay(true, e));
        } finally {
            dispatch(setLoader(false));
        }
    };
}
