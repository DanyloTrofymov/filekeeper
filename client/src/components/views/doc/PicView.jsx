import React, { useState } from 'react';
import useQuery from '../../../utils/useQuery';
import { getFile } from '../../../actions/file/getFile';
import { useDispatch, useSelector } from 'react-redux';
import './docView.css';
const PicView = () => {
    const dispatch = useDispatch();
    const [fileURL, setFileURL] = useState();
    const query = useQuery();
    const fileId = query.get('file');
    const file = useSelector((state) => state.file.data);
    if (fileId && file == '') {
        dispatch(getFile(fileId));
    }

    if (!fileURL) {
        if (file.length != 0) {
            const url = window.URL.createObjectURL(file);
            setFileURL(url);
        }
    }

    return (
        <div className="docViewer">
            <img src={fileURL} />
        </div>
    );
};

export default PicView;
