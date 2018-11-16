import React, { Component } from 'react';
import './Footer.css';
import FloatingModal from '../FloatingModal/FloatingModal';
import { connect } from 'react-redux';
import axios from 'axios';

class Footer extends Component {

  state = {
    open: false,
    name: '',
    email: '',
    message: '',
  };

  handleChangeFor = propertyName => event => {
    this.setState({
      // saves whatever state previously was and only changes current TextField
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  handleSubmit = property => (event) => {
    console.log('clickedd!');
    
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
    }
    ).then((response) => {
      console.log('Response is:', response.data);
      this.setState({
        name: '',
        email: '',
        message: '',
      });
    }).catch((error) => {
      console.log('Error in POST:', error);
    })
  }

  render() {
    return (
      <footer>
        <FloatingModal
          buttonText="Contact The Experts!"
          color="primary"
          title="Please complete the following fields to send your solar estimate to a Footprint Project Representative. We will contact you soon!"
          state={this.state}
          handleChangeFor={this.handleChangeFor}
          handleSubmit={this.handleSubmit}
          subject="Solar Estimate"
        />
        <FloatingModal
          buttonText="Report A Bug"
          color="secondary"
          title="Please complete the following fields to report a bug to the Footprint Project team."
          state={this.state}
          handleChangeFor={this.handleChangeFor}
          handleSubmit={this.handleSubmit}
          subject="Bug Report"
        />
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      sites: state.sites,
      selectedSite: state.selectedSite,
      dieselCalculation: state.dieselCalculation,
      generator: state.generator
  };
}



export default connect(mapStateToProps)(Footer);
