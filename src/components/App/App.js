import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import BugReport from '../BugReport/BugReport';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import AddSite from '../AddSite/AddSite';
import ProjectPage from '../ProjectPage/ProjectPage';
import SavedSitePage from '../SavedSitePage/SavedSitePage';
import AddProject from '../AddProject/AddProject';
import UserDashboard from '../UserDashboard/UserDashboard';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/add_site" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserDashboard if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/dashboard"
              component={UserDashboard}
            />
            <ProtectedRoute
              exact
              path="/add_project"
              component={AddProject}
            />
            <ProtectedRoute
              exact
              path="/project"
              component={ProjectPage}
            />
            <ProtectedRoute
              exact
              path="/saved_site"
              component={SavedSitePage}
            />
            <Route
              exact
              path="/add_site"
              component={AddSite}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
          <div></div>
          <BugReport />
        </div>
      </Router>
  )}
}

export default connect()(App);
