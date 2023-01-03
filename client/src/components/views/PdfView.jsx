import React, { useState } from 'react';
import useQuery from '../../utils/useQuery';
//import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { getFile } from '../../actions/file/getFile';
import { useDispatch, useSelector } from 'react-redux';

const PdfView = () => {
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

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offSet) {
        if (offSet > 0 && offSet <= numPages) {
            console.log(offSet);
            setPageNumber(Number(offSet));
        }
    }

    function nextPage() {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
    function prevPage() {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }

    function changePageScale(offSet) {
        setScale((prevScale) => prevScale + offSet);
    }
    let value;
    return (
        <div>
            <center>
                <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page
                        scale={scale}
                        pageNumber={pageNumber}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                    />
                </Document>
                <p>
                    {' '}
                    Page {pageNumber} of {numPages}
                </p>
                {pageNumber > 1 && (
                    <button onClick={() => prevPage()}>Previous Page</button>
                )}
                {pageNumber < numPages && (
                    <button onClick={() => nextPage()}>Next Page</button>
                )}
                <input
                    value={value}
                    onChange={(e) => changePage(e.target.value)}
                    type="text"
                    placeholder="page"
                />
                <button onClick={() => changePageScale(-0.15)}>scale -</button>
                <button onClick={() => changePageScale(+0.15)}>scale +</button>
            </center>
        </div>
    );
};

export default PdfView;
