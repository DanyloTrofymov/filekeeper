const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const DELETE_FILE = 'DELETE_FILE';
const SET_SORT = 'SET_SORT';
const SET_FILTER = 'SET_FILTER';
const SET_SEARCH = 'SET_SEARCH';
const SET_VIEW = 'SET_VIEW';

const defaultState = {
    files: [],
    currentDir: null,
    dirStack: [],
    sort: 'date',
    filter: [],
    search: '',
    view: 'list',
};

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES:
            return { ...state, files: action.payload };
        case SET_CURRENT_DIR:
            return { ...state, currentDir: action.payload };
        case ADD_FILE:
            return { ...state, files: [...state.files, action.payload] };
        case PUSH_TO_STACK:
            return { ...state, dirStack: [...state.dirStack, action.payload] };
        case DELETE_FILE:
            return {
                ...state,
                files: [
                    ...state.files.filter((file) => file._id != action.payload),
                ],
            };
        case SET_SORT:
            return { ...state, sort: action.payload };
        case SET_FILTER:
            if (action.add) {
                return {
                    ...state,
                    filter: [...state.filter, action.payload],
                };
            } else {
                return {
                    ...state,
                    filter: [
                        ...state.filter.filter((e) => e != action.payload),
                    ],
                };
            }
        case SET_SEARCH:
            return { ...state, search: action.payload };
        case SET_VIEW:
            return { ...state, view: action.payload };
        default:
            return state;
    }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const addFile = (file) => ({ type: ADD_FILE, payload: file });
export const pushToStack = (dir) => ({ type: PUSH_TO_STACK, payload: dir });
export const fileDelete = (fileId) => ({ type: DELETE_FILE, payload: fileId });
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });
export const setFilter = (filter, add) => ({
    type: SET_FILTER,
    payload: filter,
    add,
});
export const setSearch = (name) => ({ type: SET_SEARCH, payload: name });
export const setView = (type) => ({ type: SET_VIEW, payload: type });
