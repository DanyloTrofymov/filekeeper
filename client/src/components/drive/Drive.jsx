import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/file/getFiles';
import FileList from './fileList/FileList';
import './drive.css';
import CreateFolderModal from '../../utils/modal/CreateFolderModal';
import YesNoModal from '../../utils/modal/YesNoModal';
import { setCreateFolderDisplay } from '../../reducers/modal';
import { setCurrentDir } from '../../reducers/file';
import { uploadFile } from '../../actions/file/uploadFile';
import Uploader from '../../utils/modal/uploader/Uploader';
import { deleteFile } from '../../actions/file/deleteFile';

const Drive = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.file.currentDir);
    const dirStack = useSelector((state) => state.file.dirStack);
    const file = useSelector((state) => state.modal.yesNoProps);
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState([]);
    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        dispatch(getFiles(currentDir, sort, filter));
    }, [currentDir, sort, filter]);

    function showPopupHandler() {
        dispatch(setCreateFolderDisplay(true));
    }
    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }
    function uploadHandler(event) {
        const files = [...event.target.files];
        files.forEach((file) => {
            dispatch(uploadFile(file, currentDir));
        });
    }
    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        const files = [...event.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    }
    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }
    function dragOverHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }
    function handleCheckbox(event) {
        const { name, checked } = event.target;
        if (checked) {
            setFilter((pre) => [...pre, name]);
        } else {
            setFilter((pre) => [...pre.filter((e) => e != name)]);
        }
    }

    return (
        <div className="window">
            <div className="left-aside">
                <div className="left-aside__content">
                    <div className="left-aside__select-sort">
                        <div className="left-aside__text">Sort files by:</div>
                        <fieldset className="left-aside__fieldset">
                            <div>
                                <label className="left-aside__label">
                                    Date
                                    <input
                                        type="radio"
                                        onChange={() => setSort('date')}
                                        name="sort"
                                        defaultChecked
                                    />
                                    <span className="left-aside__radiomark"></span>
                                </label>
                                <label className="left-aside__label">
                                    Type
                                    <input
                                        type="radio"
                                        onChange={() => setSort('type')}
                                        name="sort"
                                    />
                                    <span className="left-aside__radiomark"></span>
                                </label>
                                <label className="left-aside__label">
                                    Name
                                    <input
                                        type="radio"
                                        onChange={() => setSort('name')}
                                        name="sort"
                                    />
                                    <span className="left-aside__radiomark"></span>
                                </label>
                                <label className="left-aside__label">
                                    Size
                                    <input
                                        type="radio"
                                        onChange={() => setSort('size')}
                                        name="sort"
                                    />
                                    <span className="left-aside__radiomark"></span>
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="left-aside__filter">
                        <div className="left-aside__text">
                            Filters for files:
                        </div>
                        <fieldset className="left-aside__fieldset">
                            <div>
                                <label className="left-aside__label">
                                    Documents
                                    <input
                                        type="checkbox"
                                        onChange={handleCheckbox}
                                        name="doc"
                                    />
                                    <span className="left-aside__checkmark"></span>
                                </label>
                                <label className="left-aside__label">
                                    Music
                                    <input
                                        type="checkbox"
                                        onChange={handleCheckbox}
                                        name="music"
                                    />
                                    <span className="left-aside__checkmark"></span>
                                </label>
                                <label className="left-aside__label">
                                    Photo
                                    <input
                                        type="checkbox"
                                        onChange={handleCheckbox}
                                        name="pic"
                                    />
                                    <span className="left-aside__checkmark"></span>
                                </label>
                                <label className="left-aside__label">
                                    Video
                                    <input
                                        type="checkbox"
                                        onChange={handleCheckbox}
                                        name="vid"
                                    />
                                    <span className="left-aside__checkmark"></span>
                                </label>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div
                className={!dragEnter ? 'drive' : 'drive__on-drag'}
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
            >
                <div className="drive__upload">
                    <label htmlFor="upload" className="drive__upload-label">
                        Upload file
                    </label>
                    <input
                        onChange={(event) => uploadHandler(event)}
                        multiple={true}
                        type="file"
                        id="upload"
                        className="drive__upload-input"
                    />
                </div>
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
                <Uploader />
                <YesNoModal
                    title="Do you want to delete?"
                    text="Folders can contain files that would be deleted"
                    func={deleteFile}
                    props={file}
                />
            </div>
        </div>
    );
};

export default Drive;
