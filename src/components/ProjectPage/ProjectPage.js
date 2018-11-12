import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ProjectPage.css'


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
  
  class ProjectPage extends Component {
    

  render() {

    return (
      <div >
        <h1 className="projectHeader">Project</h1>

          <div className="card">
            <img src="http://www.uhhospitals.org/~/media/UH/Images/locations/uh-chagrin-highlands-health-center.jpg" alt="Avatar" />
            <div className="container">
              <h4><b>Urgent Care Clinic</b></h4> 
              <p>Est. Power Needs</p>
              <p>10kWh/day</p>
            </div>
          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state,
});

// this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(ProjectPage);
export default withRouter(connect(mapStateToProps)(ProjectPage));