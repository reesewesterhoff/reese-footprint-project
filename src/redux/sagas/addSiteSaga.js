import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';

function* addSite(action) {
    try{
        console.log('Inside addSite function');
        if(action.payload.project_id){
            const results = yield axios.post('/projects/sites', action.payload);
            const site_id = results.data.site_id;
            console.log('site_id=',site_id);
            yield axios.post(`/projects/generators/${site_id}`,action.payload.generators)
        }
    }catch(error){
        console.log('Error adding site to project:',error);
    }
}

function* addSiteSaga() {
    yield takeEvery('ADD_SITE', addSite);
}

export default addSiteSaga;