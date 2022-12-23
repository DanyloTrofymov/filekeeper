import React from 'react';
import './modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorDisplay } from '../../reducers/modal';

const ErrorModal = () => {
    const popupDisplay = useSelector((state) => state.modal.errorDisplay);
    const message = useSelector((state) => state.modal.errorMessage);
    const dispatch = useDispatch();
    return (
        <div
            className="modal error"
            onClick={() => dispatch(setErrorDisplay('none', ''))}
            style={{ display: popupDisplay }}
        >
            <div
                className="modal__content"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal__header">
                    <div className="modal__title_error">Error</div>
                    <button
                        className="modal__close"
                        onClick={() => dispatch(setErrorDisplay('none', ''))}
                    >
                        X
                    </button>
                </div>
                <div className="modal__text">{message}</div>
            </div>
        </div>
    );
};

export default ErrorModal;
