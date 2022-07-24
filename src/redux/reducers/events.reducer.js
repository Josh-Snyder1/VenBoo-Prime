import { combineReducers } from 'redux';

const allEventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

export default allEventsReducer;