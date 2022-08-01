import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* updateUserProfile(action) {
  try {
    yield axios.put(`/api/user/${action.payload.id}`, action.payload);
    yield put({
      type: "FETCH_USER",
    });
  } catch (error) {
    console.log("uh oh there is a error in userProfile", error);
  }
}

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("/api/user", config);

    // now that the session has given us a user object
    // with an id and email set the client-side user object to let
    // the client-side code know the user is logged in

    yield put({ type: 'SET_USER', payload: response.data });

    // Set the REDUX store field `events` based on the user-type
    yield put({ type: "FETCH_EVENTS", payload: response.data });

  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeLatest("UPDATE_PROFILE", updateUserProfile);
}

export default userSaga;
