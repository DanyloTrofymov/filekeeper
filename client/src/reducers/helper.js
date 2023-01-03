const SHOW_LOADER = 'SHOW_LOADER';

const defaultState = {
    loader: false,
};

export default function helperReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loader: action.state };
        default:
            return state;
    }
}

export const setLoader = (state) => ({ type: SHOW_LOADER, state });
