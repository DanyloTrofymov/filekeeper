import React from 'react';
import './file.css';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/file';

const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.file.currentDir);

    function openHandler() {
        dispatch(pushToStack(currentDir));
        dispatch(setCurrentDir(file._id));
    }

    return (
        <div
            className="file"
            onClick={file.type === 'dir' ? () => openHandler() : ''}
        >
            <img
                src={file.type === 'dir' ? dirLogo : fileLogo}
                alt=""
                width="50"
                className="file__img"
            />
            <div className="file__name">{file.name}</div>
            <div className="file__type">
                {file.type === 'dir' ? 'Folder' : file.type}
            </div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">
                {file.type === 'dir' ? '' : convertSize(file.size)}
            </div>
        </div>
    );
};

function convertSize(size) {
    if (size > 1024 ** 4) {
        return `${(size / 1024 ** 4).toFixed(1)} gb`;
    }
    if (size > 1024 ** 2) {
        return `${(size / 1024 ** 2).toFixed(1)} mb`;
    }
    if (size > 1024) {
        return `${(size / 1024).toFixed(1)} kb`;
    }
    return `${size} bytes`;
}

export default File;
