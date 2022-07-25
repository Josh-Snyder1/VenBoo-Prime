import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* eventDetails() {
    console.log('in event details')
    try{
        const response = yield axios.get(`/api/eventbooths`)
        yield put ({
            type: 'SET_EVENT_BOOTHS',
            payload: response.data
        })
    }
    catch (err) {
        console.error('error in events saga', err)
    }
}

function* eventBooths() {
    yield takeLatest('FETCH_DETAILS', eventDetails);
  }
export default eventBooths;