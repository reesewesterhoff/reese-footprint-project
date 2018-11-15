import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* addProject(action) {
    yield call(axios.post, '/projects', action.payload);
      yield put({ type: 'SET_PROJECTS', payload: action.payload });
}

function* getProjects(action) {
    try {
      const projects = yield axios.get(`/projects/${action.payload.id}` )
      yield put({ type: 'SET_PROJECTS', payload: projects.data });
      
    } catch (error) {
      console.log('error getting projects:', error);
    }
}

function* projectSaga() {
    yield takeLatest('ADD_PROJECT', addProject);
    yield takeLatest('GET_PROJECTS', getProjects);
}

export default projectSaga;