import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

function* eventSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
}

export default eventSaga;
