// Import the used libraries and functions
import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";


// Create the SAGA to get the booth applications for an event
function* fetchBoothApplicaitons(action) {

    try {
        const res = yield axios.get(`/api/events/${action.payload.id}/booth-applications`);
        yield put({
            type: 'SET_EVENT_BOOTH_APPLICATIONS',
            payload: res.data
        })
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

function* requestBoothApp(action) {
    try {
        yield axios.post(`/api/booths/apply`, action.payload)
        yield put({
            type: 'FETCH_EVENTS'
        })
    }
    catch (err) {
        console.log('error in booths saga post', err)
    }
}



// Main listener function for SAGA calls
function* boothApplcationsSaga() {
    yield takeEvery('FETCH_VENDOR_BOOTH_APPLICATIONS', fetchBoothApplicaitons);
    yield takeEvery('APPROVE_BOOTH_APP', approveBoothApp)
    yield takeEvery('ADD_BOOTH_APPLICATION', requestBoothApp)
}


export default boothApplcationsSaga;