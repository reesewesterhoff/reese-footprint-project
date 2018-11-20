import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';

//SET UP FOR POST TO DATABASE IN STRETCH

function* addSite(action) {
    try{
        console.log('Inside addSite function');
        if(action.payload.project_id){
            const results = yield axios.post('/projects/sites', action.payload);
            const site_id = results.data.site_id;
            console.log('site_id=',site_id);
            yield axios.post(`/projects/generators/${site_id}`,action.payload.generators)
        }else{
            yield put({ type: 'SET_SITES', payload: action.payload });
            //does this do anything?
        }
    }catch(error){
        console.log('Error adding site to project:',error);
    }
}

function* addSiteSaga() {
    yield takeEvery('ADD_SITE', addSite);
}

export default addSiteSaga;