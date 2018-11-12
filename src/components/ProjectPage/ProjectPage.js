import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
  
  class ProjectPage extends Component {
    

  render() {

    return (
      <div >
        <h1>Project</h1>
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