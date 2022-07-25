import { combineReducers } from 'redux';

const tagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

export default tagsReducer;