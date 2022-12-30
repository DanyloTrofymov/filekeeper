import axios from 'axios';
//import { setErrorDisplay } from '../../reducers/modal';

export async function openFile(file) {
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
            link.open = file.name;
            document.body.appendChild(link);
            chooseAction(file.type, link);
            //link.click();
            //link.remove();
        }
    } catch (e) {
        console.log(e);
    }
}
function chooseAction(type, link) {
    switch (type) {
        case 'doc':
        case 'docx':
        case 'pdf':
        case 'xls':
        case 'xlsx': {
            //link.click();
            const viewLink = document.createElement('a');
            viewLink.href =
                location.protocol +
                '//' +
                location.host +
                '/viewDoc?file=' +
                link;
            viewLink.click();
            break;
        }
        case 'mp3':
        case 'wav': {
            link.click();
            break;
        }
        case 'jpg':
        case 'jpeg':
        case 'png': {
            link.click();
            break;
        }
        case 'mp4':
        case 'm4a':
        case 'mov': {
            link.click();
            break;
        }
        default:
            link.click();
    }
}
