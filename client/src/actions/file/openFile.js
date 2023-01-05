import { setErrorDisplay } from '../../reducers/modal';
import { downloadFile } from './downloadFile';

const CLICK = 'click';
const PDF = 'viewPDF';
const DOC = 'viewDoc';
const MUSIC = 'viewAudio';
const VIDEO = 'viewVideo';
const PIC = 'viewPhoto';

export function openFile(file) {
    return async (dispatch) => {
        try {
            const viewer = chooseViewer(file.type);
            if (viewer == CLICK) {
                downloadFile(file);
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
                viewLink.click();
            }
        } catch (e) {
            if (e.response)
                dispatch(setErrorDisplay(true, e.response.data.message));
            else dispatch(setErrorDisplay(true, e));
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
        case 'png': {
            return PIC;
        }
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
        case 'mp4':
        case 'm4a':
        case 'mov': {
            return VIDEO;
        }
        default:
            return CLICK;
    }
}
