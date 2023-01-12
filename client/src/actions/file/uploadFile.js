import axios from 'axios';
import { addFile } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';
import {
    changeUploadFile,
    showUploader,
    addUploadFile,
} from '../../reducers/upload';
import { v4 as uuid } from 'uuid';

export function uploadFile(file, dir) {
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
            if (dir) {
                formData.append('parent', dir._id);
            }
            const id = uuid();
            const upload = { name: file.name, progress: 0, id: id };
            dispatch(showUploader());
            dispatch(addUploadFile(upload));
            const URL = `${process.env.REACT_APP_API_URL}api/v1/drive/upload/`;
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
            if (e.response)
                dispatch(setErrorDisplay(true, e.response.data.message));
            else dispatch(setErrorDisplay(true, e));
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
