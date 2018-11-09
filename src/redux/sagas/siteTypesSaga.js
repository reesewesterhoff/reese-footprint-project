import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSiteTypes() {
  try {
    const response = yield axios.get('api/sitetypes');
    yield put({ type: 'SET_SITE_TYPES', payload: response.data });
  } catch (error) {
    console.log('Site types get request failed', error);
  }
}

function* siteTypesSaga() {
  yield takeLatest('FETCH_SITE_TYPES', fetchSiteTypes);
}

export default siteTypesSaga;
