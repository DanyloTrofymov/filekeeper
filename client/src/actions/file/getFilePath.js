import axios from 'axios';
import { setFilepath } from '../../reducers/file';
import { setLoader } from '../../reducers/helper';
import { setErrorDisplay } from '../../reducers/modal';

export function getFilePath(fileId) {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true));
            const URL = `${process.env.REACT_APP_API_URL}api/v1/drive/getpath?id=${fileId}`;
            const token = localStorage.getItem('token');
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const path = response.data.data.path.replaceAll('\\', '/');
                dispatch(setFilepath(path));
            }
        } catch (e) {
            if (e.response)
                dispatch(setErrorDisplay(true, e.response.data.message));
            else dispatch(setErrorDisplay(true, e));
        } finally {
            dispatch(setLoader(false));
        }
    };
}
