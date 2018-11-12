import React, { Component } from 'react';
import Map from '../Map/Map'
import { connect } from 'react-redux';

class MapPage extends Component {
  state = {
  }

  handleClick = (event) => {
    this.setState({
        location: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        selectedState: { center_lat: event.latLng.lat(), center_lng: event.latLng.lng(), zoom: this.gmap.props.zoom },
        zoom: Math.max(10, this.gmap.props.zoom), mapClicked: true
    });
    console.log('You clicked on', this.state);
    // console.log(this.gmap.__reactInternalMemoizedMaskedChildContext.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.zoom);
}

  handleToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Map 
            googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div style={{ height: `100%` }} />}
            containerElement = {<div style={{ height: `50vh`, width: '50vh', float: 'right', paddingRight: '10%', paddingTop: '10%',}} />}
            mapElement = {<div style={{ height: `100%` }} />}
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            handleToggleOpen={this.handleToggleOpen}
            isOpen = {this.state.isOpen}
            onClick={this.handleClick}
        />

      </div> 
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(MapPage);