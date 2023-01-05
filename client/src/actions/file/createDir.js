import axios from 'axios';
import { addDir } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';

export function createDir(dir, name) {
    return async (dispatch) => {
        try {
            const URL = process.env.REACT_APP_API_URL + 'api/v1/drive/';
            const token = localStorage.getItem('token');
            let id;
            if (dir) {
                id = dir._id;
            }
            const response = await axios.post(
                URL,
                {
                    name,
                    parent: id,
                    type: 'dir',
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            dispatch(addDir(response.data.data));
        } catch (e) {
            if (e.response)
                dispatch(setErrorDisplay(true, e.response.data.message));
            else dispatch(setErrorDisplay(true, e));
        }
    };
}
