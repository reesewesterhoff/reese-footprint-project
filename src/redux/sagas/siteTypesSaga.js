import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchSiteTypes(action) {
  console.log('action.payload', action.payload);
  
  try {
    const response = yield call(axios.get, `api/sitetypes/${action.payload}`);
    yield put({ type: 'SET_SITE_TYPES', payload: response.data });
  } catch (error) {
    console.log('Site types get request failed', error);
  }
}
function* fetchAllSiteTypes(action) {
  console.log('action.payload', action.payload);
  
  try {
    const response = yield call(axios.get, `api/sitetypes`);
    yield put({ type: 'SET_ALL_SITE_TYPES', payload: response.data });
  } catch (error) {
    console.log('Site types get request failed', error);
  }
}

function* siteTypesSaga() {
  yield takeLatest('FETCH_SITE_TYPES', fetchSiteTypes);
  yield takeLatest('FETCH_ALL_SITE_TYPES', fetchAllSiteTypes);
}

export default siteTypesSaga;
