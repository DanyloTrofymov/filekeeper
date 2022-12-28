import React from 'react';
import UploadFile from './UploadFile';
import './uploader.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../../reducers/upload';

const Uploader = () => {
    const files = useSelector((state) => state.upload.files);
    const isVisible = useSelector((state) => state.upload.isVisible);
    const dispatch = useDispatch();

    return (
        <div className={isVisible ? 'uploader' : 'inactive'}>
            <div className="uploader__header">
                <div className="uploader__title">Uploads</div>
                <button
                    className="uploader__close"
                    onClick={() => dispatch(hideUploader())}
                >
                    X
                </button>
            </div>
            <div className="uploader__content">
                {files.map((file) => (
                    <UploadFile key={file.id} file={file} />
                ))}
            </div>
        </div>
    );
};

export default Uploader;
