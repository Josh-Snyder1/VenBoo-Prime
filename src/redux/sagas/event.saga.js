import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEvents() {
  try {
    const res = yield axios.get(`/api/events`);
    yield put({ type: "SET_EVENTS", payload: res.data });
  } catch (err) {
    console.error("error in events saga", err);
  }
}

function* addNewEvent(action) {
  try {
    yield axios.post("/api/events", action.payload);
  } catch (error) {
    console.log("Error with event:", error);
  }
}

function* updateEvent(action) {
  try {
    yield axios.put("/api/events", action.payload);
  } catch (error) {
    console.log("Uh oh there is a error", error);
  }
}

function* eventSaga() {
  yield takeLatest("ADD_NEW_EVENT", addNewEvent);
  yield takeLatest("FETCH_EVENTS", fetchEvents);
  yield takeLatest("UPDATE_EVENT_DETAILS", updateEvent);
}

export default eventSaga;
