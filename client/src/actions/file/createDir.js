import axios from 'axios';
import { addFile } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';

export function createDir(dirId, name) {
    return async (dispatch) => {
        try {
            const URL = process.env.REACT_APP_API_URL + 'drive/';
            const token = localStorage.getItem('token');
            const response = await axios.post(
                URL,
                {
                    name,
                    parent: dirId,
                    type: 'dir',
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            dispatch(addFile(response.data.data));
        } catch (e) {
            dispatch(setErrorDisplay('flex', e.response.data.message));
        }
    };
}
