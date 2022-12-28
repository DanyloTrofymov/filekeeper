import React from 'react';
import './modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { setYesNoDisplay } from '../../reducers/modal';
//import { deleteFile } from '../../actions/file/deleteFile';

const YesNoModal = ({ title, text, func, props }) => {
    const popupDisplay = useSelector((state) => state.modal.yesNoModalDisplay);
    //const file = useSelector((state) => state.modal.yesNoFile);
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
                    <div className="modal__title">{title}</div>
                    <button
                        className="modal__close"
                        onClick={() => dispatch(setYesNoDisplay('none', null))}
                    >
                        X
                    </button>
                </div>
                <div className="modal__text">{text}</div>
                <div className="modal__buttons">
                    <button
                        onClick={() => {
                            dispatch(func(props)),
                                dispatch(setYesNoDisplay('none', null));
                        }}
                    >
                        Yes
                    </button>
                    <button
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
