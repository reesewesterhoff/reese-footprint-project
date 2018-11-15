import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* addProject(action) {
    yield call(axios.post, '/projects', action.payload);
      yield put({ type: 'SET_PROJECTS', payload: action.payload });
}

function* addProjectSaga() {
    yield takeLatest('ADD_PROJECT', addProject);
}

export default addProjectSaga;