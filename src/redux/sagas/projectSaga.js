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

function* getProject(action) {
  let id = action.payload
  try {
    const project = yield axios.get(`/projects/${id}`)
    yield put({ type: 'SET_PROJECT', payload: project.data });

  } catch (error) {
    console.log('error getting projects:', error);
  }
}

function* getSites(action) {
  let id = action.payload
  try {
    const sites = yield axios.get(`/projects/sites/${id}`)
    yield put({ type: 'SET_SITES_BY_PROJECT', payload: sites.data });

  } catch (error) {
    console.log('error getting projects:', error);
  }
}



function* projectSaga() {
  yield takeLatest('ADD_PROJECT', addProject);
  yield takeLatest('GET_PROJECTS', getProjects);
  yield takeLatest('GET_PROJECT', getProject);
  yield takeLatest('GET_SITES_BY_PROJECT', getSites);
}

export default projectSaga;