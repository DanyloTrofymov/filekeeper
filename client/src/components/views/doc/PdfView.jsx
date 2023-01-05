import React, { useState } from 'react';
import useQuery from '../../../utils/useQuery';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { getFile } from '../../../actions/file/getFile';
import { useDispatch, useSelector } from 'react-redux';
import './docView.css';
const PdfView = () => {
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

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(0.9);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offSet) {
        if (offSet > 0 && offSet <= numPages) {
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
        if (scale * offSet > 0.5 && scale * offSet < 3)
            setScale((prevScale) => prevScale * offSet);
    }
    let value;
    return (
        <div className="docViewer">
            <div className="navigation">
                <div className="scale">
                    {scale > 0.55 && (
                        <button onClick={() => changePageScale(0.9)}>
                            scale -
                        </button>
                    )}
                    {scale < 2.8 && (
                        <button onClick={() => changePageScale(1.1)}>
                            scale +
                        </button>
                    )}
                </div>
                <div className="page">
                    {pageNumber > 1 && (
                        <button onClick={() => prevPage()}>
                            Previous Page
                        </button>
                    )}
                    {pageNumber < numPages && (
                        <button onClick={() => nextPage()}>Next Page</button>
                    )}
                </div>
                <input
                    value={value}
                    onChange={(e) => changePage(e.target.value)}
                    type="text"
                    placeholder="page"
                />
                <p>
                    {' '}
                    Page {pageNumber} of {numPages}
                </p>
                <Document
                    file={fileURL}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="doc"
                >
                    <Page
                        scale={scale}
                        pageNumber={pageNumber}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                    />
                </Document>
            </div>
        </div>
    );
};

export default PdfView;
