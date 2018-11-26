import React from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import _ from 'lodash';
import { Marker } from 'react-google-maps';
import SiteMarker from '../Marker/Marker'
import Hospital from '../../icons/hospital.svg'
import Business from '../../icons/business.svg'
import Home from '../../icons/home.svg'
import Restaurant from '../../icons/restaurant.svg'
import Router from '../../icons/router.svg'
import Security from '../../icons/security.svg'
import Store from '../../icons/store.svg'
import Waves from '../../icons/waves.svg'

/* global google */

class SitesMap extends React.Component {
  state = {
    bounds: null,
    center: {
      lat: 40, lng: 45
    },
    isMarkerShown: false,
    showInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    windowPosition: null,
    mapClicked: false,
  }

  chooseIcon = iconCategory => {
    switch (iconCategory) {
        case 'Health':
            return <Hospital style={{ width: "10vmin", height: "10vmin" }} />
        case 'Water':
            return <Waves style={{ width: "10vmin", height: "10vmin" }} />
        case 'Comms':
            return <Router style={{ width: "10vmin", height: "10vmin" }} />
        case 'Ops':
            return <Security style={{ width: "10vmin", height: "10vmin" }} />
        case 'Shelter':
            return <Home style={{ width: "10vmin", height: "10vmin" }} />
        case 'Food':
            return <Restaurant style={{ width: "10vmin", height: "10vmin" }} />
        case 'Admin':
            return <Business style={{ width: "10vmin", height: "10vmin" }} />
        case 'Logs':
            return <Store style={{ width: "10vmin", height: "10vmin" }} />
        default:
            return null;
    }
}

  componentWillMount() {
    const refs = {}


    this.setState({
      bounds: null,
      center: {
        lat: Number(this.props.sitesByProject[0].latitude), lng: Number(this.props.sitesByProject[0].longitude)
      },
      markers: [],
      onMapMounted: ref => {
        refs.map = ref;
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        });
        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
        }));
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

        this.setState({
          center: nextCenter,
          markers: nextMarkers,
        });
        refs.map.fitBounds(bounds);
      },
    })
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  render() {
    return (
      <div>
        <GoogleMap
          ref={this.state.onMapMounted}
          defaultZoom={8}
          center={this.state.center}
          onClick={this.props.handleClick}
          onBoundsChanged={this.props.onBoundsChanged}
          defaultOptions={{
            // these following 7 options turn certain controls off see link below
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            // zoomControl: false,
            rotateControl: false,
            fullscreenControl: false}}>
              < SearchBox
            ref={ this.state.onSearchBoxMounted }
            bounds={ this.state.bounds }
            controlPosition={ google.maps.ControlPosition.TOP_LEFT }
            
            onPlacesChanged={ this.state.onPlacesChanged } >
            <input
              type="text"
              placeholder="Enter Site Location"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `80%`,
                height: `6%`,
                marginTop: `5%`,
                marginLeft: '10%',
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `2vmin`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            />
          </SearchBox>
              {/*  Display Markers with InfoWindows */}
              {this.props.sitesByProject.map((site, index) => <SiteMarker key={index}
                                        position={{ lat: Number(site.latitude), lng: Number(site.longitude)}}
                                        selectSite= {this.props.selectSite}
                                        index={index}
                                        image=  {this.props.allSiteTypes[(site.site_type_id - 1)].category}
                                    />)}

                                    {/* End Markers Display */}
        </GoogleMap>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  state: state,
  sitesByProject: state.sitesByProject,
  allSiteTypes: state.allSiteTypes,
});

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(SitesMap)))