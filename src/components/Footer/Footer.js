import React, { Component } from 'react';
import './Footer.css';
// to use modal
import FloatingModal from '../FloatingModal/FloatingModal';
// alerts user that email was sent
import Snackbar from '@material-ui/core/Snackbar';
// connect to redux state
import { connect } from 'react-redux';
// allows axios requests
import axios from 'axios';

class Footer extends Component {

  state = {
    contactExpertOpen: false,
    reportBugOpen: false,
    snackbarOpen: false,
    name: '',
    email: '',
    message: '',
  };

  // handles changes in input fields
  handleChangeFor = propertyName => event => {
    this.setState({
      // saves whatever state previously was and only changes current TextField
      ...this.state,
      [propertyName]: event.target.value
    });
  }; // end handleChangeFor

  // modal opens
  handleContactExpertToggle = () => {
    this.setState({
      ...this.state,
      contactExpertOpen: !this.state.contactExpertOpen,
      reportBugOpen: false,
    });
  }; // end handleContactExpertToggle

  // close modal
  handleClose = () => this.setState({ ...this.state, contactExpertOpen: false, reportBugOpen: false });

  // submits info entered in modal to email
  handleSubmit = property => event => {
    event.preventDefault();
    axios.post('/email', {
      content: { name: this.state.name, email: this.state.email, subject: property, message: this.state.message },
      siteName: this.props.sites.length ? this.props.sites[0].siteName : 'Not entered',
      fundStartDate: this.props.sites.length ? this.props.sites[0].fundStartDate : 'Not entered',
      fundEndDate: this.props.sites.length ? this.props.sites[0].fundEndDate : 'Not entered',
      location: this.props.sites.length ? this.props.sites[0].location : 'Not entered',
      generator: this.props.generator.length ? this.props.generator[0] : 'Not entered',
      selectedSite: this.props.selectedSite.type,
      totalDieselCost: this.props.dieselCalculation.totalDieselCost || 0,
      address: this.props.sites.length ? this.props.sites[0].address : 'Not entered',
    }).then(() => {
      this.setState({
        name: '',
        email: '',
        message: '',
        snackbarOpen: true,
        reportBugOpen: false,
        contactExpertOpen: false,
      });
    }).catch(error => console.log('Error in POST:', error));
  }

  render() {
    return (
      <footer>
        <FloatingModal
          buttonText="Contact Us"
          color="8BC34A"
          title="Please complete the following fields to send your solar estimate to a Footprint Project Representative. We will contact you soon!"
          state={this.state}
          modalOpen={this.state.contactExpertOpen}
          handleModalToggle={this.handleContactExpertToggle}
          handleChangeFor={this.handleChangeFor}
          handleSubmit={this.handleSubmit}
          handleClose={this.handleClose}
          subject="Solar Estimate"
          id="contact"
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={<span id="message-id">Email Sent</span>}
          autoHideDuration={2000}
          onClose={() => this.setState({ snackbarOpen: false })}
        />
      </footer>
    );
  }
}

// allows access to info in redux state
const mapStateToProps = state => ({
    sites: state.sites,
    selectedSite: state.selectedSite,
    dieselCalculation: state.dieselCalculation,
    generator: state.generator
})

export default connect(mapStateToProps)(Footer);