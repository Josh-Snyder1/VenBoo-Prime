import { combineReducers } from 'redux';

const vendorBoothsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VENDOR_BOOTHS':
            return [...state, action.payload];
        case "UNSET_USER":
            return [];
        default:
            return state;
    }
}

export default vendorBoothsReducer;