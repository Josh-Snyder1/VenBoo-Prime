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

function* boothsSaga() {
    yield takeEvery('FETCH_VENDOR_BOOTHS', fetchVendorBooths);
}

export default boothsSaga;