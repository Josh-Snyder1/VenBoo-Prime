import { takeEvery, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchVendorBooths() {
    console.log('in fetchVendorBooths');
    try {
        const res = yield axios.get(`/api/booths/vendor`);
        yield put({
            type: 'SET_VENDOR_BOOTHS',
            payload: res.data
        })
    }
    catch (err) {
        console.log('error in booths saga', err)
    }
}

function* addBooth(action) {
    try {
        yield axios.post(`/api/booths`, action.payload)
        yield put({
            type: 'FETCH_EVENTS'
        })
    }
    catch (err) {
        console.log('error in booths saga post', err)
    }
}

function* deleteBooth(req) {
    try{
        yield axios.delete(`/api/booths/${req.payload.id}`)
        yield put ({ type: 'FETCH_EVENTS'})
    }
    catch (err) {
        console.error('error in delete booth saga', err)
    }
}

function* editBooth(req) {
    try{
        console.log('in booths saga', req.payload)
        yield axios.put(`/api/booths/${req.payload.id}`,req.payload);
        yield put ({ type: 'FETCH_EVENTS'});
    }
    catch (err) {
        console.error('error in booths edit saga', err)

    }
}

function* boothsSaga() {
    yield takeEvery('FETCH_VENDOR_BOOTHS', fetchVendorBooths);
    yield takeEvery('ADD_BOOTH', addBooth);
    yield takeEvery('DELETE_EVENT_BOOTH', deleteBooth);
    yield takeEvery('EDIT_BOOTH', editBooth)

}

export default boothsSaga;