import React, { Component } from 'react';
// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RouterIcon from '@material-ui/icons/Router';
import SiteTypeCategoryCard from '../SiteTypeCategoryCard/SiteTypeCategoryCard';
import WavesIcon from '@material-ui/icons/Waves';
import SecurityIcon from '@material-ui/icons/Security';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';

// jss styles
const styles = {
    icon: {
        fontSize: 70,
        textAlign: 'center',
    },
    cardDiv: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    }
};

class SiteTypeCategory extends Component {

    state = {
        active: null,
    }

    // toggles card color on click of site type category
    toggleColor = (position) => {
        if (this.state.active === position) {
          this.setState({active : null})
        } else {
          this.setState({active : position})
        }
      }
      
      // card turns this color
      myColor = (position) => {
        if (this.state.active === position) {
          return "MediumAquaMarine";
        }
        return "";
      }


    render() {

        const { classes } = this.props;

        // save icon as a variable to pass it through props
        const hospitalIcon = <LocalHospitalIcon className={classes.icon} />
        const waterIcon = <WavesIcon className={classes.icon} />
        const commsIcon = <RouterIcon className={classes.icon} />
        const opsIcon = <SecurityIcon className={classes.icon} />
        const adminIcon = <BusinessCenterIcon className={classes.icon} />
        const shelterIcon = <HomeIcon className={classes.icon} />
        const foodIcon = <RestaurantIcon className={classes.icon} />
        const logsIcon = <StoreIcon className={classes.icon} />

        return (
            <div className={classes.cardDiv}>
                {/* site type category cards */}
                <SiteTypeCategoryCard 
                    icon={hospitalIcon}
                    title="Health"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(0)}} 
                    toggleColor={() => {this.toggleColor(0)}}
                />
                <SiteTypeCategoryCard 
                    icon={waterIcon}
                    title="Water"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(1)}} 
                    toggleColor={() => {this.toggleColor(1)}}
                />
                <SiteTypeCategoryCard 
                    icon={commsIcon}
                    title="Comms"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(2)}} 
                    toggleColor={() => {this.toggleColor(2)}}
                />
                <SiteTypeCategoryCard 
                    icon={opsIcon}
                    title="Ops"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(3)}} 
                    toggleColor={() => {this.toggleColor(3)}}
                />
                <SiteTypeCategoryCard 
                    icon={shelterIcon}
                    title="Shelter"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(4)}} 
                    toggleColor={() => {this.toggleColor(4)}}
                />
                <SiteTypeCategoryCard 
                    icon={foodIcon}
                    title="Food"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(5)}} 
                    toggleColor={() => {this.toggleColor(5)}}
                />
                <SiteTypeCategoryCard 
                    icon={adminIcon}
                    title="Admin"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(6)}} 
                    toggleColor={() => {this.toggleColor(6)}}
                />
                <SiteTypeCategoryCard 
                    icon={logsIcon}
                    title="Logs"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(7)}} 
                    toggleColor={() => {this.toggleColor(7)}}
                />
            </div>
        );
    }
}

// needed for jss styles
SiteTypeCategory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SiteTypeCategory);