import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';
import './UserPage.css'
import { withRouter } from 'react-router-dom';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
  
  class ProjectPage extends Component {
    

  render() {

    return (
      <div >

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