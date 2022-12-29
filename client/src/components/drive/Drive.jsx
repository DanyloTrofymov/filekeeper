import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/file/getFiles';
import { deleteFile } from '../../actions/file/deleteFile';
import { uploadFile } from '../../actions/file/uploadFile';
import { setCurrentDir } from '../../reducers/file';
import { setCreateFolderDisplay } from '../../reducers/modal';
import CreateFolderModal from '../../utils/modal/CreateFolderModal';
import YesNoModal from '../../utils/modal/YesNoModal';
import Uploader from '../../utils/modal/uploader/Uploader';
import FileList from './fileList/FileList';
import FilterBox from './leftAside/filter/filterBox';
import SortBox from './leftAside/sort/sortBox';
import SearchBar from './leftAside/searchBar/searchBar';
import './drive.css';
import '../../utils/loader.css';

const Drive = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const currentDir = useSelector((state) => state.file.currentDir);
    const dirStack = useSelector((state) => state.file.dirStack);
    const file = useSelector((state) => state.modal.yesNoProps);
    const loader = useSelector((state) => state.hepler.loader);
    const sort = useSelector((state) => state.file.sort);
    const filter = useSelector((state) => state.file.filter);
    const search = useSelector((state) => state.file.search);
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
    /*function getPath(){
        let path = '';
        let dirs = useSelector((state) => state.file.dirStack)
        dirs.forEach(dir => path+=dir + '/')
        return path;
                <div>{getPath()}</div>

    }*/
    return (
        <div className="window">
            <div className="left-aside">
                <div className="left-aside__content">
                    <SearchBar />
                    {!search.length ? (
                        <div>
                            <SortBox />
                            <FilterBox />
                        </div>
                    ) : (
                        <div></div>
                    )}
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
                    {currentDir != user.id ? (
                        <button
                            className="drive__back"
                            onClick={() => backClickHandler()}
                        >
                            Back
                        </button>
                    ) : (
                        <div></div>
                    )}
                    <button
                        className="drive__create"
                        onClick={() => showPopupHandler()}
                    >
                        Create folder
                    </button>
                </div>
                {loader ? (
                    <div className="center">
                        <span className="loader"></span>
                    </div>
                ) : (
                    <FileList />
                )}
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
