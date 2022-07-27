import { all } from "redux-saga/effects";
import boothApplcationsSaga from "./boothApplications.saga";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import eventSaga from "./event.saga";
import boothsSaga from './booths.saga';
import eventBooths from './eventbooth.saga';
import tagSaga from './tags.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    boothApplcationsSaga(), // SAGA to take in the current event's vendor application list
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    eventSaga(),
    boothsSaga(),
    eventBooths(),
    tagSaga(),
  ]);
}
