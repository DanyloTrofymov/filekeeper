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
            className={popupDisplay ? 'modal create' : 'inactive'}
            onClick={() => dispatch(setErrorDisplay(false, ''))}
            style={{ display: popupDisplay ? 'flex' : 'none' }}
        >
            <div
                className={
                    popupDisplay
                        ? 'modal__content '
                        : 'modal__content__inacative'
                }
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal__header">
                    <div className="modal__title">Error</div>
                </div>
                <div className="modal__text">{message}</div>
                <div className="modal__buttons">
                    <button
                        className="modal__button__negative"
                        onClick={() => dispatch(setErrorDisplay(false, ''))}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
