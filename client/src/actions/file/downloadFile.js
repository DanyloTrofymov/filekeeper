import axios from 'axios';
//import { setErrorDisplay } from '../../reducers/modal';

export async function downloadFile(file) {
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
            const downloadUrl = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    } catch (e) {
        console.log(e);
    }
}
