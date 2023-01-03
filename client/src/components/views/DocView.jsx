import React, { useState } from 'react';
import useQuery from '../../utils/useQuery';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
//import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { getFile } from '../../actions/file/getFile';
import { useDispatch, useSelector } from 'react-redux';

const DocView = () => {
    const dispatch = useDispatch();
    const [fileURL, setFileURL] = useState();
    const query = useQuery();
    const fileId = query.get('file');
    const file = useSelector((state) => state.file.data);
    dispatch(getFile(fileId));

    if (!fileURL) {
        if (file.length != 0) {
            const url = window.URL.createObjectURL(file);
            setFileURL(url);
        }
    }

    const docs = [{ uri: fileURL }];

    return (
        <div className="view">
            <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
        </div>
    );
};
export default DocView;
