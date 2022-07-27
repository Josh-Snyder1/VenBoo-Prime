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

function* deleteBooth(action) {
    try {
      const response = yield axios({
        method: "DELETE",
        url: `/api/eventbooths/${action.payload}`,
      });
      yield put({
        type: 'FETCH_DETAILS',
      });
    } catch {
      console.log("ERROR/DELETE BOOTH");
    }
  }

function* eventBooths() {
    yield takeLatest('FETCH_DETAILS', eventDetails);
    yield takeLatest('DELETE_BOOTH', deleteBooth);
  }
export default eventBooths;