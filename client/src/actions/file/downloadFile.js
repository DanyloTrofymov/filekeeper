import axios from 'axios';
import { setErrorDisplay } from '../../reducers/modal';

export function downloadFile(file) {
    return async (dispatch) => {
        try {
            const URL = `${process.env.REACT_APP_API_URL}drive/download?id=${file._id}`;
            const token = localStorage.getItem('token');
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });
            if (response.status === 200) {
                const blob = response.data;
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (e) {
            if (e.response)
                dispatch(setErrorDisplay(true, e.response.data.message));
            else dispatch(setErrorDisplay(true, e));
        }
    };
}
