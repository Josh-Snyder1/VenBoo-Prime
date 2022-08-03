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

function* deleteBooth(action) {
    console.log('deleting booth', action.payload)
    try {
        yield axios.delete(`/api/events/${action.payload.rowid}`);
        yield put ({
            type: 'FETCH_VENDOR_BOOTHS'
            
        })
    }
    catch(err) {
        console.log('error in delete booth', err)
    }
}

function* boothsSaga() {
    yield takeEvery('FETCH_VENDOR_BOOTHS', fetchVendorBooths);
    yield takeEvery('DELETE_BOOTHS', deleteBooth);
}

export default boothsSaga;