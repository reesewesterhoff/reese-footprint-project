import { put, takeLatest, select } from 'redux-saga/effects';

function* setResults() {
    try {
        const sites = yield select(state => state.sites);
        yield put({type: 'RUN_DIESEL_CALCULATION', payload: sites})
    } catch (error) {
        console.log('Could not set results', error);
    }
}

function* setResultsSaga() {
    yield takeLatest('ADD_SITE', setResults);
}

export default setResultsSaga;