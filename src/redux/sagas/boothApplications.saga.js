// Import the used libraries and functions
import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";


// Create the SAGA to get the booth applications for an event
function* fetchBoothApplicaitons(action) {

    console.log(">>>>>>>>>", action)

    try {
        console.log('test fetch booth apps')
        const res = yield axios.get(`/api/events/${action.payload.id}/booth-applications`);
        console.log('this is res.data', res.data)
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

function* approveBoothApp(action) {
    console.log('in approveBoothApp, this is action', action)
    try {
        yield axios.put(`/api/eventbooths`, action.payload);
        yield put({
            type: 'FETCH_VENDOR_BOOTH_APPLICATIONS',
            payload: {id: action.payload.id}
        })
    }
    catch (err) {
        console.log('Error in approveBoothApp', err);
    }
}


// Main listener function for SAGA calls
function* boothApplcationsSaga() {
    yield takeEvery('FETCH_VENDOR_BOOTH_APPLICATIONS', fetchBoothApplicaitons);
    yield takeEvery('APPROVE_BOOTH_APP', approveBoothApp)
}


export default boothApplcationsSaga;