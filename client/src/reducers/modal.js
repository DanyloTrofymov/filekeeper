const SET_ERROR = 'ERROR';
const SET_CREATE_FOLDER = 'CREATE_FOLDER';

const defaultState = {
    errorDisplay: 'none',
    errorMessage: '',
    createFolderDisplay: 'none',
};

export default function modalReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                errorDisplay: action.payload,
                errorMessage: action.message,
            };
        case SET_CREATE_FOLDER:
            return { ...state, createFolderDisplay: action.payload };
        default:
            return state;
    }
}

export const setErrorDisplay = (display, message) => ({
    type: SET_ERROR,
    payload: display,
    message,
});
export const setCreateFolderDisplay = (display) => ({
    type: SET_CREATE_FOLDER,
    payload: display,
});
