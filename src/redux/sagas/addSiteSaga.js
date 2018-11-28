import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* addSite(action) {
    try{
        console.log('Inside addSite function');
        if(action.payload.project_id){
            const results = yield axios.post('/projects/sites', action.payload);
            const site_id = results.data.site_id;
            console.log('site_id=',site_id);
            yield axios.post(`/projects/generators/${site_id}`,action.payload.generators)
            yield put({ type: 'GET_SITES_BY_PROJECT', payload: action.payload.project_id });
        }
    }catch(error){
        console.log('Error adding site to project:',error);
    }
}

function* addSiteSaga() {
    yield takeEvery('ADD_SITE_TO_PROJECT', addSite);
}

export default addSiteSaga;