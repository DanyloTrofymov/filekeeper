import React from 'react';
import './uploader.css';
import { useSelector } from 'react-redux';
const UploadFile = ({ file }) => {
    const isVisible = useSelector((state) => state.upload.isVisible);
    return (
        <div className={isVisible ? 'upload-file' : 'inactive'}>
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
            </div>
            <div className="upload-file__progress-bar">
                <div
                    className="upload-file__upload-bar"
                    style={{ width: file.progress + '%' }}
                />
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;
