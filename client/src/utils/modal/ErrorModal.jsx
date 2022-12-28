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
                    <div className="modal__title">Error</div>
                </div>
                <div className="modal__text">{message}</div>
                <div className="modal__buttons">
                    <button
                        className="modal__create"
                        onClick={() => dispatch(setErrorDisplay('none', ''))}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
