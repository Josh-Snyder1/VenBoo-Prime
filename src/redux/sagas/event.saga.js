import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addNewEvent(action) {
  try {
    yield axios.post("/api/event");
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}

function* eventSaga() {
  yield takeLatest("ADD_EVENT", addNewEvent);
}

export default eventSaga;
