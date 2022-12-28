import axios from 'axios';
import { addFile } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';
import {
    changeUploadFile,
    showUploader,
    addUploadFile,
} from '../../reducers/upload';

export function uploadFile(file, dirId) {
    return async (dispatch) => {
        try {
            const type = file.name.toLowerCase().split('.').pop() || '';
            if (!allowedTypes.includes(type)) {
                dispatch(
                    setErrorDisplay(
                        'flex',
                        `You can\`t upload file with type ${type}`,
                    ),
                );
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId);
            }
            const upload = { name: file.name, progress: 0, id: Date.now() };
            dispatch(showUploader());
            dispatch(addUploadFile(upload));
            const URL = `${process.env.REACT_APP_API_URL}drive/upload/`;
            const token = localStorage.getItem('token');
            const response = await axios.post(URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader(
                              'content-length',
                          ) ||
                          progressEvent.target.getResponseHeader(
                              'x-decompressed-content-length',
                          );
                    if (totalLength) {
                        upload.progress = Math.round(
                            (progressEvent.loaded * 100) / totalLength,
                        );
                        dispatch(changeUploadFile(upload));
                    }
                },
            });
            dispatch(addFile(response.data.data));
        } catch (e) {
            dispatch(setErrorDisplay('flex', e.response.data.message));
        }
    };
}

const allowedTypes = [
    'doc',
    'docx',
    'pdf',
    'txt',
    'xls',
    'xlsx',
    'jpg',
    'png',
    'mp3',
    'wav',
    'mp4',
    'm4a',
    'mov',
];
