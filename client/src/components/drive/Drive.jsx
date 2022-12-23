import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/file/getFiles';
import FileList from './fileList/FileList';
import './drive.css';
import CreareFolderModal from '../../utils/modal/CreateFolderModal';
import ErrorModal from '../../utils/modal/ErrorModal';
import { setCreateFolderDisplay } from '../../reducers/modal';

const Drive = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.file.currentDir);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    function showPopupHandler() {
        dispatch(setCreateFolderDisplay('flex'));
    }

    return (
        <div className="drive">
            <div className="drive__btns">
                <button className="drive__back">Back</button>
                <button
                    className="drive__create"
                    onClick={() => showPopupHandler()}
                >
                    Create folder
                </button>
            </div>
            <FileList />
            <CreareFolderModal />
            <ErrorModal />
        </div>
    );
};

export default Drive;
