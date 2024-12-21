import { SET_USER, CLEAR_USER, SET_NOTES, LOGOUT } from './actions';

const initialState = {
    user: null,
    notes: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case CLEAR_USER:
        case LOGOUT:
            return {
                ...state,
                user: null,
            };
        case SET_NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;