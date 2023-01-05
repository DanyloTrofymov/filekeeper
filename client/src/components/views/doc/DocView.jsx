import React, { useState } from 'react';
import useQuery from '../../../utils/useQuery';
import { getFilePath } from '../../../actions/file/getFilePath';
import { useDispatch, useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { setLoader } from '../../../reducers/helper';
import './docView.css';

const DocView = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const fileId = query.get('file');
    const filePath = useSelector((state) => state.file.filePath);
    const loader = useSelector((state) => state.hepler.loader);
    const [doc, setDoc] = useState([]);
    if (fileId && filePath == '') {
        dispatch(getFilePath(fileId));
    }

    if (doc.length == 0) {
        dispatch(setLoader(true));
        if (filePath.length != 0) {
            setDoc([{ uri: process.env.REACT_APP_API_URL + filePath }]);
        }
    }
    if (doc.length != 0) {
        dispatch(setLoader(false));
    }

    if (loader)
        return (
            <div className="center">
                <span className="loader"></span>
            </div>
        );

    return (
        <div className="docViewer">
            <DocViewer
                pluginRenderers={DocViewerRenderers}
                documents={doc}
                className="docViewer"
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
