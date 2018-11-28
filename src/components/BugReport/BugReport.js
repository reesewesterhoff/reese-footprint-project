import React, { Component } from 'react';
import './BugReport.css';
// import floating modal for bug report
import FloatingModal from '../FloatingModal/FloatingModal';
// snackbar for confirmation
import Snackbar from '@material-ui/core/Snackbar';
// connect to redux
import { connect } from 'react-redux';
// enable axios requests
import axios from 'axios';

class BugReport extends Component {

  state = {
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

  // handles the modal open
  handleReportBugToggle = () => {
    this.setState({
      ...this.state,
      reportBugOpen: !this.state.reportBugOpen,
      contactExpertOpen: false,
    });
  }; // end handleReportBugToggle

  // closes modal
  handleClose = () => this.setState({ ...this.state, contactExpertOpen: false, reportBugOpen: false });

  // submits entered information in modal
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
      });
    }).catch(error => alert('Error in POST:', error));
  }

  render() {
    return (
      <div className="bugReport">
        <FloatingModal
          buttonText="Report A Bug"
          color="secondary"
          title="Please complete the following fields to report a bug to the Footprint Project team."
          state={this.state}
          modalOpen={this.state.reportBugOpen}
          handleModalToggle={this.handleReportBugToggle}
          handleChangeFor={this.handleChangeFor}
          handleSubmit={this.handleSubmit}
          handleClose={this.handleClose}
          subject="Bug Report"
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={<span id="message-id">Email Sent</span>}
          autoHideDuration={2000}
          onClose={() => this.setState({ snackbarOpen: false })}
        />
      </div>
    );
  }
}

// allows access to information in redux state
const mapStateToProps = state => ({
    sites: state.sites,
    selectedSite: state.selectedSite,
    dieselCalculation: state.dieselCalculation,
    generator: state.generator
})

export default connect(mapStateToProps)(BugReport);