import React, { useState } from 'react';
import Input from '../input/Input';
import './modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateFolderDisplay } from '../../reducers/modal';
import { createDir } from '../../actions/file/createDir';

const CreateFolderModal = () => {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(
        (state) => state.modal.createFolderDisplay,
    );
    const currentDir = useSelector((state) => state.file.currentDir);
    const dispatch = useDispatch();

    function createHandler() {
        dispatch(createDir(currentDir, dirName));
    }

    return (
        <div
            className="modal create"
            onClick={() => dispatch(setCreateFolderDisplay('none'))}
            style={{ display: popupDisplay }}
        >
            <div
                className="modal__content"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal__header">
                    <div className="modal__title">Create new folder</div>
                </div>

                <Input
                    type="text"
                    placeholder="Enter folder name"
                    value={dirName}
                    setValue={setDirName}
                />
                <div className="modal__buttons">
                    <button
                        className="modal__create"
                        onClick={() => {
                            setDirName(''),
                                createHandler(),
                                dispatch(setCreateFolderDisplay('none'));
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateFolderModal;
