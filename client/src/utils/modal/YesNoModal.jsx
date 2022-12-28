import React from 'react';
import './modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { setYesNoDisplay } from '../../reducers/modal';
//import { deleteFile } from '../../actions/file/deleteFile';

const YesNoModal = ({ title, text, func, props }) => {
    const popupDisplay = useSelector((state) => state.modal.yesNoModalDisplay);
    //const props = useSelector((state) => state.modal.yesNoProps);
    const dispatch = useDispatch();
    return (
        <div
            className={popupDisplay ? 'modal create' : 'inactive'}
            onClick={() => dispatch(setYesNoDisplay(false, null))}
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
                    <div className="modal__title">{title}</div>
                </div>
                <div className="modal__text">{text}</div>
                <div className="modal__buttons">
                    <button
                        className="modal__button__negative"
                        onClick={() => {
                            dispatch(setYesNoDisplay(false, null));
                        }}
                    >
                        No
                    </button>
                    <button
                        className="modal__button__positive"
                        onClick={() => {
                            dispatch(func(props)),
                                dispatch(setYesNoDisplay('none', null));
                        }}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default YesNoModal;
