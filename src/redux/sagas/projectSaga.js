import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* addProject(action) {

  try {
    yield call(axios.post, '/projects', action.payload);
    yield put({type: 'GET_PROJECTS'})
  } catch (error) {
    console.log('error adding project', error);

  }
}

function* getProjects(action) {

    try {
      const projects = yield axios.get(`/projects` );
      yield put({ type: 'SET_PROJECTS', payload: projects.data });
    } catch (error) {
      console.log('Error getting projects:', error);
    }

}

function* projectSaga() {
  yield takeLatest('ADD_PROJECT', addProject);
  yield takeLatest('GET_PROJECTS', getProjects);
}

export default projectSaga;