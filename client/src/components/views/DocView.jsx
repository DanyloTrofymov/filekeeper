import React, { useEffect, useState } from 'react';
import useQuery from '../../utils/useQuery';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
//import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { getFile } from '../../actions/file/getFile';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../reducers/helper';

const DocView = () => {
    const dispatch = useDispatch();
    const [fileURL, setFileURL] = useState();
    const query = useQuery();
    const fileId = query.get('file');
    const file = useSelector((state) => state.file.data);
    const loader = useSelector((state) => state.hepler.loader);
    const [doc, setDoc] = useState([]);
    if (fileId) {
        dispatch(getFile(fileId));
    }

    useEffect(() => {
        dispatch(setLoader(true));
    }, []);

    if (!fileURL) {
        if (file.length != 0) {
            const url = window.URL.createObjectURL(file);
            setFileURL(url);
        }
    }
    if (fileURL) {
        setDoc([{ uri: fileURL }]);
        dispatch(setLoader(false));
    }

    if (loader)
        return (
            <div className="center">
                <span className="loader"></span>
            </div>
        );
    return (
        <div className="view">
            <DocViewer pluginRenderers={DocViewerRenderers} documents={doc} />
        </div>
    );
};
export default DocView;
