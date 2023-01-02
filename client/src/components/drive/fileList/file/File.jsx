import React from 'react';
import './file.css';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/file';
import { downloadFile } from '../../../../actions/file/downloadFile';
import { openFile } from '../../../../actions/file/openFile';
import { setYesNoDisplay } from '../../../../reducers/modal';

const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.file.currentDir);
    const view = useSelector((state) => state.file.view);

    function openHandler() {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file));
        } else {
            dispatch(openFile(file));
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        dispatch(downloadFile(file));
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        dispatch(setYesNoDisplay(true, file));
    }

    if (view == 'list') {
        return (
            <div className="file" onClick={() => openHandler()}>
                <img
                    src={file.type === 'dir' ? dirLogo : fileLogo}
                    alt=""
                    width="50"
                    className="file__img"
                />
                <div className="file__name">{file.name}</div>
                <div className="file__type">
                    {file.type === 'dir' ? 'folder' : file.type}
                </div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{convertSize(file.size)}</div>
                {file.type !== 'dir' && (
                    <button
                        onClick={(e) => downloadClickHandler(e)}
                        className="file__btn file__download"
                    >
                        Download
                    </button>
                )}
                <button
                    onClick={(e) => deleteClickHandler(e)}
                    className="file__btn file__delete"
                >
                    Delete
                </button>
            </div>
        );
    }
    if (view == 'plate') {
        return (
            <div className="file-plate" onClick={() => openHandler()}>
                <img
                    src={file.type === 'dir' ? dirLogo : fileLogo}
                    alt=""
                    width="50"
                    className="file-plate__img"
                />
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btn">
                    {file.type !== 'dir' && (
                        <button
                            onClick={(e) => downloadClickHandler(e)}
                            className="file-plate__download"
                        >
                            Download
                        </button>
                    )}
                    <button
                        onClick={(e) => deleteClickHandler(e)}
                        className="file-plate__delete"
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
};

function convertSize(size) {
    if (size > 1024 ** 3) {
        return `${(size / 1024 ** 3).toFixed(1)} gb`;
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
