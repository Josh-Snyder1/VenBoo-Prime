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


// Check for a matching dispatch call
function* eventsSaga() {
  yield takeLatest("FETCH_ALL_EVENTS", fetchAllEvents);
}


// Make the SAGA available
export default eventsSaga;