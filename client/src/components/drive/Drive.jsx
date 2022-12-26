import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/file/getFiles';
import FileList from './fileList/FileList';
import './drive.css';
import CreateFolderModal from '../../utils/modal/CreateFolderModal';

import { setCreateFolderDisplay } from '../../reducers/modal';
import { setCurrentDir } from '../../reducers/file';

const Drive = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.file.currentDir);
    const dirStack = useSelector((state) => state.file.dirStack);
    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    function showPopupHandler() {
        dispatch(setCreateFolderDisplay('flex'));
    }
    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }
    return (
        <div className="drive">
            <div className="drive__btns">
                <button
                    className="drive__back"
                    onClick={() => backClickHandler()}
                >
                    Back
                </button>
                <button
                    className="drive__create"
                    onClick={() => showPopupHandler()}
                >
                    Create folder
                </button>
            </div>
            <FileList />
            <CreateFolderModal />
        </div>
    );
};

export default Drive;
