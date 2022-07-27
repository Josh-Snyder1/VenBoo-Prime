import { combineReducers } from 'redux';

const eventbooths = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_BOOTHS':
            return action.payload;
        case "UNSET_USER":
            return [];
        default:
            return state;
    }
}

export default eventbooths;