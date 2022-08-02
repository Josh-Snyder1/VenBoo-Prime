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
  try{
      yield axios.delete(`/api/eventbooths/${action.payload.id}`)
      yield put ({ type: 'FETCH_DETAILS'})
  }
  catch (err) {
      console.error('error in delete BOOTHS saga', err)
  }
}

function* addBooth(req) {
  try{
      yield axios.post(`/api/eventbooths`, req.payload);
      yield put ({ type: 'FETCH_DETAILS'})
  }
  catch (err) {
      console.error('error in add tag post', err);
  }
}

function* eventBooths() {
    yield takeLatest('FETCH_DETAILS', eventDetails);
    yield takeLatest('DELETE_BOOTH', deleteBooth);
    yield takeLatest('ADD_BOOTH', addBooth);
  }
export default eventBooths;