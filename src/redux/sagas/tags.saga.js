import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTags() {
    console.log('in fetchTags saga')
    try{
        const res = yield axios.get(`/api/tags`)
        yield put ({ type: 'SET_TAGS', payload: res.data})
    }
    catch (err) {
        console.error('error in tags saga', err)
    }
}

function* tagSaga() {
  yield takeLatest('FETCH_TAGS', fetchTags);
}

export default tagSaga;
