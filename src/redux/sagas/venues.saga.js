import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchVenues() {
    console.log('in fetchvenues saga')
    try{
        const res = yield axios.get(`/api/venues`)
        yield put ({ type: 'SET_VENUES', payload: res.data})
    }
    catch (err) {
        console.error('error in venues saga', err)
    }
}

function* addVenue(req) {
    try{
        yield axios.post(`/api/venues`, req.payload);
        yield put ({ type: 'FETCH_VENUES'})
    }
    catch (err) {
        console.error('error in add venues post', err);
    }
}

function* deleteVenue(req) {
    try{
        yield axios.delete(`/api/venues/${req.payload.id}`)
        yield put ({ type: 'FETCH_VENUES'})
    }
    catch (err) {
        console.error('error in delete venue saga', err)
    }
}

function* editVenue(req) {
    try{
        yield axios.put(`/api/venues/${req.payload.id}`,req.payload);
        yield put ({ type: 'FETCH_VENUES'});
    }
    catch (err) {
        console.error('error in edit venue saga', err)
    }
}

function* venuesSaga() {
  yield takeLatest('FETCH_VENUES', fetchVenues);
  yield takeLatest('ADD_VENUE', addVenue);
  yield takeLatest('DELETE_VENUE', deleteVenue);
  yield takeLatest('EDIT_VENUE',  editVenue);
}

export default venuesSaga;
