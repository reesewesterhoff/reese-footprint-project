import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import google maps api for Marker
import { Marker } from 'react-google-maps';



class SiteMarker extends Component {
    state = {
        isOpen: false,
    }
    
    handleToggleOpen = () => {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    };



  render() {

    return (  
        // Setup Marker
        <Marker
            position={this.props.position}
            // position={{lat: 6.542503571838057, lng: -1.4808464031250423}}
            onClick={() => this.props.selectSite(this.props.index)}
            icon={{ url: "https://us.123rf.com/450wm/luplupme/luplupme1607/luplupme160700108/59439418-vector-sun-icon-isolated-on-white-background-sun-vector-isolated-summer-icon-design-vector-yellow-su.jpg?ver=6", 
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
