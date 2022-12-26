import axios from 'axios';
import { addFile } from '../../reducers/file';
import { setErrorDisplay } from '../../reducers/modal';

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
            console.log(file);
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}drive/upload/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token',
                        )}`,
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
                        console.log('total', totalLength);
                        if (totalLength) {
                            let progress = Math.round(
                                (progressEvent.loaded * 100) / totalLength,
                            );
                            console.log(progress);
                        }
                    },
                },
            );
            console.log(response.data.data);
            dispatch(addFile(response.data.data));
        } catch (e) {
            console.log(e);
            //dispatch(setErrorDisplay('flex', e));
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
