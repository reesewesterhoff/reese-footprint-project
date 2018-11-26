import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import google maps api for Marker
import { Marker } from 'react-google-maps';
import Hospital from '../../icons/hospital.svg'
import Business from '../../icons/business.svg'
import Home from '../../icons/home.svg'
import Restaurant from '../../icons/restaurant.svg'
import Router from '../../icons/router.svg'
import Security from '../../icons/security.svg'
import Store from '../../icons/store.svg'
import Waves from '../../icons/waves.svg'

class SiteMarker extends Component {
    state = {
        isOpen: false,
    }
    
    handleToggleOpen = () => {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    };

    chooseIcon = iconCategory => {
        switch (iconCategory) {
            case 'Health':
                return Hospital 
            case 'Water':
                return Waves
            case 'Comms':
                return Router
            case 'Ops':
                return Security
            case 'Shelter':
                return Home
            case 'Food':
                return Restaurant
            case 'Admin':
                return Business
            case 'Logs':
                return Store
            default:
                return null;
        }
    }

  render() {
    return (  
        // Setup Marker
        <Marker
            optimized="false"
            position={this.props.position}
            onClick={() => this.props.selectSite(this.props.index)}
            icon={{ url: this.chooseIcon(this.props.image),
            size: {width: 60, height: 100}, anchor: {x: 15, y: 50}, scaledSize: {width: 30, height: 30}, }}
            >
        </Marker>
        // End Marker
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default withRouter(connect(mapStateToProps)(SiteMarker));
