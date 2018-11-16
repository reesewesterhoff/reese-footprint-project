import { put, takeLatest, select } from 'redux-saga/effects';
import moment from 'moment';

function* setResults() {
    try {
        const sites = yield select(state => state.sites);
        const selectedSite = yield select(state => state.selectedSite);
        const generators = yield select(state => state.generator);
        const startDate = moment(sites[0].fundStartDate);
        const endDate = moment(sites[0].fundEndDate);
        const timeline = endDate.diff(startDate,'months');
        const timeToPayOff = selectedSite.total_price
                /( generators.map(generator=>parseInt(generator.monthlyCost)).reduce((total,current)=>total+current) );
        const payOffDate = startDate.add(timeToPayOff,'months');
        const payOffInTime = payOffDate.isBefore(endDate);
        console.log('selectedSite',selectedSite, 'generators',generators);
        yield put({type: 'RUN_DIESEL_CALCULATION', payload: {sites, timeToPayOff, payOffDate, payOffInTime, timeline}});
    } catch (error) {
        console.log('Could not set results', error);
    }
}

function* setResultsSaga() {
    yield takeLatest('SET_SELECTED_SITE', setResults);
}

export default setResultsSaga;