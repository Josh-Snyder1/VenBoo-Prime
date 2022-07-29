import { combineReducers } from "redux";
import boothApplications from "./boothApplications.reducer";
import errors from "./errors.reducer";
import user from "./user.reducer";
import events from './event.reducer';
import booths from './booths.reducer';
import eventbooths from './eventbooths.reducer';
import tags from './tags.reducer';
import vendorBoothsReducer from "./booths.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  boothApplications, // Contains a list of all vendor applications for an event, both approved, pending, and rejected
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and email if someone is logged in
  events,
  booths,
  eventbooths,
  tags,
  vendorBoothsReducer

});

export default rootReducer;
