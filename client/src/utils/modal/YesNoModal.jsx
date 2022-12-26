import React from 'react';
import './modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { setYesNoDisplay } from '../../reducers/modal';
import { deleteFile } from '../../actions/file/deleteFile';

const YesNoModal = () => {
    const popupDisplay = useSelector((state) => state.modal.yesNoModalDisplay);
    const file = useSelector((state) => state.modal.yesNoFile);
    const dispatch = useDispatch();
    return (
        <div
            className="modal"
            onClick={() => dispatch(setYesNoDisplay('none', false))}
            style={{ display: popupDisplay }}
        >
            <div
                className="modal__content"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal__header">
                    <div className="modal__title">Do you want to delete?</div>
                    <div className="modal__text">
                        Folders can contain files that will be deleted
                    </div>
                    <button
                        className="modal__button"
                        onClick={() => {
                            dispatch(deleteFile(file)),
                                dispatch(setYesNoDisplay('none', null));
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="modal__button"
                        onClick={() => {
                            dispatch(setYesNoDisplay('none', null));
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default YesNoModal;
