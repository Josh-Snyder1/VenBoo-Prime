// Import the core libraries and functions
import axios from "axios"
import { put, takeLatest } from "redux-saga/effects"


// Function to get the vendors from the server
function* fetchVendors() {
  try {
    // Call the API
    const res = yield axios.get(`/api/vendors`)
    // Set the response to the REDUX store
    yield put({ type: "SET_VENDORS", payload: res.data })

  } catch (err) {
    console.error("error in vendors saga", err)
  }
}


// Function that get events and all the approved
// vendor booths with their payment information.
function* fetchApprovedVendorBoothsForEvents() {
  try {
    // Call the API
    const res = yield axios.get(`api/vendors/approved-vendor-booths`)
    // Set the response to the REDUX store
    yield put({ type: "SET_ALL_APPROVED_VENDOR_BOOTHS", payload: res.data })

  } catch (err) {
    console.error("error in vendors saga", err)
  }
}

function* fetchAllVendors() {
  try {
    const res = yield axios.get(`/api/vendors/all`)
    yield put({
      type: "SET_VENDORS",
      payload: res.data
    })
  }
  catch (err) {
    console.log('error in fetchAllVendors', err)
  }
}



// Main listener for dispatch events
function* vendorSaga() {
  yield takeLatest("FETCH_VENDORS", fetchVendors),
  yield takeLatest("FETCH_ALL_APPROVED_VENDOR_BOOTHS", fetchApprovedVendorBoothsForEvents),
  yield takeLatest("FETCH_ALL_VENDORS", fetchAllVendors)
}


// Export the SAGA so it can be dispatched to
export default vendorSaga;