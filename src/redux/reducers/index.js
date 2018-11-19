import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import siteTypes from './siteTypesReducer';
import sites from './addSiteReducer';
import generator from './generatorReducer';
import selectedSite from './selectedSiteReducer';
import dieselCalculation from './calculationReducer';
import projectsReducer from './projectsReducer';
import projectId from './projectIdReducer';
import project from './projectReducer';
import sitesByProject from './sitesByProjectReducer';
import allSiteTypes from './allSiteTypesReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  siteTypes,
  sites,
  generator, // will have the list of generators the user has added to their site
  selectedSite,
  dieselCalculation, // will have the total amount of $ spent on diesel/energy fuel over period of time
  projectsReducer, // will have all of the projects associated with a user
  projectId, // will store current selected project id
  project, // will store selected project 
  sitesByProject, // will store sites selected by project id
  allSiteTypes, // will store site types for logged in users
});

export default rootReducer;
