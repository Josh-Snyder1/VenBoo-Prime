// Import the used libraries and functions
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


// Create the SAGA to get the booth applications for an event
function* fetchBoothApplicaitons(action) {

    console.log(">>>>>>>>>", action)

    try {
        console.log('test fetch booth apps')
        const res = yield axios.get(`/api/events/${action.payload.id}/booth-applications`);
        yield put({
            type: 'SET_EVENT_BOOTH_APPLICATIONS',
            payload: res.data
        })
        console.log('in boothapp saga', res.data)
    }
    catch (err) {
        console.log(`Error in the fetchBoothApplicaitons with: ${err}`)
    }
}


// Main listener function for SAGA calls
function* boothApplcationsSaga() {
    yield takeLatest('FETCH_VENDOR_BOOTH_APPLICATIONS', fetchBoothApplicaitons);
}


export default boothApplcationsSaga;