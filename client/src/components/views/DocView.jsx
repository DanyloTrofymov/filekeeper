import React, { useState } from 'react';
import useQuery from '../../utils/useQuery';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
//import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { getFile } from '../../actions/file/getFile';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../reducers/helper';
import './view.css';

const DocView = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const fileId = query.get('file');
    const file = useSelector((state) => state.file.data);
    const loader = useSelector((state) => state.hepler.loader);
    const [doc, setDoc] = useState([]);
    if (fileId && file == '') {
        dispatch(getFile(fileId));
    }

    if (doc.length == 0) {
        dispatch(setLoader(true));
        if (file.length != 0) {
            const url = window.URL.createObjectURL(file);
            setDoc([{ uri: url }]);
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
