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

function* addTag(req) {
    try{
        yield axios.post(`/api/tags`, req.payload);
        yield put ({ type: 'FETCH_TAGS'})
    }
    catch (err) {
        console.error('error in add tag post', err);
    }
}

function* deleteTag(req) {
    try{
        yield axios.delete(`/api/tags/${req.payload.id}`)
        yield put ({ type: 'FETCH_TAGS'})
    }
    catch (err) {
        console.error('error in delete tag saga', err)
    }
}

function* editTag(req) {
    try{
        yield axios.put(`/api/tags/${req.payload.id}`,req.payload);
        yield put ({ type: 'FETCH_TAGS'});
    }
    catch (err) {
        console.error('error in tags saga', err)
    }
}

function* tagSaga() {
  yield takeLatest('FETCH_TAGS', fetchTags);
  yield takeLatest('ADD_TAG', addTag);
  yield takeLatest('DELETE_TAG', deleteTag);
  yield takeLatest('EDIT_TAG',  editTag);
}

export default tagSaga;
