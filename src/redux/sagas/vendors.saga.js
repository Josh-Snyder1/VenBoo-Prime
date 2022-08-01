// Import the core libraries and functions
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


// Function to get the vendors from the server
function* fetchVendors() {
  try {
    const res = yield axios.get(`/api/vendors`);
    console.log(res.data, ">>>>>>>>>>>")
    yield put({ type: "SET_VENDORS", payload: res.data });
  } catch (err) {
    console.error("error in vendors saga", err);
  }
}


// Main listener for dispatch events
function* vendorSaga() {
  yield takeLatest("FETCH_VENDORS", fetchVendors);
}


// Export the SAGA so it can be dispatched to
export default vendorSaga;