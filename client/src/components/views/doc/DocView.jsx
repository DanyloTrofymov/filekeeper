import React, { useEffect, useState } from 'react';
import useQuery from '../../../utils/useQuery';
import { getFilePath } from '../../../actions/file/getFilePath';
import { useDispatch, useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import './docView.css';

const DocView = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const fileId = query.get('file');
    const filePath = useSelector((state) => state.file.filePath);
    const [loader, setLoader] = useState(true);
    const [doc, setDoc] = useState([]);

    useEffect(() => {
        if (filePath.length != 0) {
            setDoc([{ uri: process.env.REACT_APP_API_URL + filePath }]);
            setLoader(false);
        }
    }, [filePath.length]);

    if (fileId && filePath == '') {
        dispatch(getFilePath(fileId));
    }

    if (loader) {
        return (
            <div className="center">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className="docViewer">
            <DocViewer
                pluginRenderers={DocViewerRenderers}
                documents={doc}
                className="doc"
                config={{
                    header: {
                        disableHeader: true,
                    },
                }}
            />
        </div>
    );
};
export default DocView;
