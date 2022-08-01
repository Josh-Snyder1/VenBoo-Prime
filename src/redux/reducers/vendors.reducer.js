// Import the core libraries and functions
import { combineReducers } from 'redux';


// Main reducer to contain all the vendor information
const allVendors = (state = [], action) => {
  switch (action.type) {
    case 'SET_VENDORS':
      return action.payload;
    case "UNSET_USER":
      return [];
    default:
      return state;
  }
}

// Make the vendor REDUX store available to the app
export default combineReducers({
  allVendors,
})