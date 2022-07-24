import { combineReducers } from 'redux';

const vendorBoothsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VENDOR_BOOTHS':
            return action.payload;
        default:
            return state;
    }
}

export default vendorBoothsReducer;