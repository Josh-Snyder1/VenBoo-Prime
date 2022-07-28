import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEvents() {
  console.log('in fetchEvents')
  try{
      const res = yield axios.get(`/api/events`)
      yield put ({ type: 'SET_EVENTS', payload: res.data})
  }
  catch (err) {
      console.error('error in events saga', err)
  }
}

function* fetchHostEvents() {
  console.log('in fetchEvents')
  try{
      const res = yield axios.get(`/api/events/host-events`)
      yield put ({ type: 'SET_EVENTS', payload: res.data})
  }
  catch (err) {
      console.error('error in events saga', err)
  }
}

function* addNewEvent(action) {
  try {
    yield axios.post("/api/event", action.payload);
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}

function* eventSaga() {
  yield takeLatest("ADD_NEW_EVENT", addNewEvent);
  yield takeLatest("FETCH_EVENTS", fetchEvents);
}

export default eventSaga;
