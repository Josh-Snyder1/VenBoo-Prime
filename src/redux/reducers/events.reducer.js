// Import the used libraries and functions
import { combineReducers } from 'redux';


// Reducer that stores a list of all events
const allEvents = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_EVENTS':
            return action.payload;
        case "UNSET_USER":
            return [];
        default:
            return state;
    }
}

// Reducer that handles storing the current event
const currentEvent = (state = {}, action) => {
  switch (action.type) {
      case 'SET_CURRENT_EVENT':
          return action.payload;
      case "UNSET_USER":
          return {};
      default:
          return state;
  }
}

// Combine the various event STORE elements 
export default combineReducers({
  allEvents,
  currentEvent,
});