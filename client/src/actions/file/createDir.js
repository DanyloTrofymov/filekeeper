import axios from 'axios';
import { addDir } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';

export function createDir(dir, name) {
    return async (dispatch) => {
        try {
            const URL = process.env.REACT_APP_API_URL + 'drive/';
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
            dispatch(setErrorDisplay(true, e.response.data.message));
        }
    };
}
