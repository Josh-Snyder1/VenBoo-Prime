// Import the core libraries and functions
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


// Function that gets the events list, booth stats, and tags
// from the server
function* fetchAllEvents() {
  try {
    const res = yield axios.get(`/api/events/events-and-booths`);
    yield put({ type: "SET_ALL_EVENTS", payload: res.data });
  } catch (err) {
    console.error(`Error in fetchAllEvents saga with ${err}`);
  }
}


// Function that gets a single event based on a URL param, including
// event fields, booths by size, and availability of booths
function* fetchOneEvent(action) {
  console.log('in events saga fetchOneEvent', action)
  try {
    const res = yield axios.get(`/api/events/events-and-booths/${action.payload.eventId}`);
    // Check that data was returned
    if (res.data[0]) {
      yield put({ type: "SET_CURRENT_EVENT", payload: res.data[0] });
    }
  } catch (err) {
    console.error(`Error in fetchAllEvents saga with ${err}`);
  }
}


// Function that allows admins to verify a host event
// function* submitVerification(req) {
//   console.log("Okay...", req)
//   try{
//     console.log('in submit verification saga', req.payload)
//     yield axios.put(`/api/events/verification/${req.payload.id}`,req.payload);
//     yield put({ type: "FETCH_CURRENT_EVENT", payload: {id: req.payload.id}})
//   }
//   catch (err) {
//       console.error('error in edit user verification saga', err)
//   }
// }

// Check for a matching dispatch call
function* eventsSaga() {
  yield takeLatest("FETCH_ALL_EVENTS", fetchAllEvents);
  yield takeLatest("FETCH_CURRENT_EVENT", fetchOneEvent)
}


// Make the SAGA available
export default eventsSaga;