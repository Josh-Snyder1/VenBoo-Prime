import { combineReducers } from 'redux';

const tagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        case "UNSET_USER":
            return [];
        default:
            return state;
    }
}

export default tagsReducer;