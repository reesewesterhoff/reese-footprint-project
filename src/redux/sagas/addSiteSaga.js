import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';

//SET UP FOR POST TO DATABASE IN STRETCH

function* addSite(action) {
    try{
        console.log('Inside addSite function');
        if(action.payload.project_id){
            yield axios.post('/projects/sites', action.payload);
        }else{
            yield put({ type: 'SET_SITES', payload: action.payload });
        }
    }catch(error){
        console.log('Error adding site to project:',error);
    }
}

function* addSiteSaga() {
    yield takeEvery('ADD_SITE', addSite);
}

export default addSiteSaga;