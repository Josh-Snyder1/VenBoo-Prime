import { combineReducers } from 'redux';

const eventbooths = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_BOOTHS':
            return action.payload;
        default:
            return state;
    }
}

export default eventbooths;