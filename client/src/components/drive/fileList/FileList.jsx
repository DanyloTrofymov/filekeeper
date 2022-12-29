import React from 'react';
import { useSelector } from 'react-redux';
import File from './file/File';
import './fileList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FileList = () => {
    const files = useSelector((state) => state.file.files).map((file) => (
        <CSSTransition
            key={file._id}
            timeout={500}
            classNames={'file'}
            exit={false}
        >
            <File file={file} />
        </CSSTransition>
    ));
    if (files.length == 0) {
        return (
            <div className="center">
                <h1>Empty folder</h1>
            </div>
        );
    }
    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__type">Type</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__size">Size</div>
                <div className="filelist__download">Download</div>
                <div className="filelist__delete">Delete</div>
            </div>
            <TransitionGroup>{files}</TransitionGroup>
        </div>
    );
};

export default FileList;
