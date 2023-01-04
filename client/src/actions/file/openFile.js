import axios from 'axios';
//import { setData } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';

const CLICK = 'click';
const PDF = 'viewPDF';
const DOC = 'viewDoc';
const MUSIC = 'viewAudio';
const VIDEO = 'viewVodeo';

export function openFile(file) {
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
                const viewer = chooseViewer(file.type);
                if (viewer == CLICK) {
                    const downloadUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = file.name;
                    document.body.appendChild(link);
                    downloadUrl.click();
                    downloadUrl.remove();
                } else {
                    const viewLink = document.createElement('a');
                    viewLink.href =
                        location.protocol +
                        '//' +
                        location.host +
                        '/' +
                        viewer +
                        '?file=' +
                        file._id;
                    //console.log(viewLink.href);
                    viewLink.click();
                }
            }
        } catch (e) {
            dispatch(setErrorDisplay(true, e.response.data.message));
        }
    };
}

function chooseViewer(type) {
    switch (type) {
        case 'pdf': {
            return PDF;
        }
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx': {
            return DOC;
        }
        case 'mp3':
        case 'wav': {
            return MUSIC;
        }
        /*case 'jpg':
        case 'jpeg':
        case 'png': {
            link.click();
            break;
        }*/
        case 'mp4':
        case 'm4a':
        case 'mov': {
            return VIDEO;
        }
        default:
            return CLICK;
    }
}
